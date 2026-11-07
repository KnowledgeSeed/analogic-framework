// @analogic/client - the browser side of an analogic client bundle.
//
// Framework independent ESM. Every call goes through the app's own endpoints, so authentication, pool and
// impersonate users, required_permissions and <key>_analogic_check_access apply exactly as for widgets. Each request
// names the bundle (X-Analogic-Bundle) - the server lets it reach only the data sources of the bundle's manifest -
// and carries the session's CSRF token.
//
//   export async function mount(element, ctx) {
//       const rows = await ctx.query('salesByRegion', {year: '2026'});
//       ...
//       return () => { /* unmount */ };
//   }

export const VERSION = '1.0.0';

const DEFAULT_QUERY_URL = 'api/v1/ExecuteMDX?$expand=Axes($expand=Tuples($expand=Members($select=Name,UniqueName,'
    + 'Attributes))),Cells($select=Ordinal,Value,FormattedValue,Updateable)';

export class AnalogicError extends Error {
    constructor(message, status, body) {
        super(message);
        this.name = 'AnalogicError';
        this.status = status;
        this.body = body;
    }
}

function stringParams(params) {
    // The server substitutes $name in the repository query with these values, as strings.
    const result = {};
    Object.entries(params || {}).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            result[key] = typeof value === 'string' ? value : String(value);
        }
    });
    return result;
}

export function createContext(boot) {
    const listeners = {};
    const base = boot.baseUrl.endsWith('/') ? boot.baseUrl : boot.baseUrl + '/';
    let csrfToken = boot.csrfToken;
    let expired = false;

    function emit(event, detail) {
        (listeners[event] || []).slice().forEach(fn => {
            try {
                fn(detail);
            } catch (e) {
                console.error(e);
            }
        });
    }

    async function request(path, {method = 'POST', body, json = true, raw = false} = {}) {
        const headers = {'X-Analogic-Bundle': boot.bundle, 'X-CSRFToken': csrfToken, 'Accept': 'application/json'};
        if (body !== undefined && json) {
            headers['Content-Type'] = 'application/json; charset=utf-8';
        }
        const response = await fetch(base + path, {
            method, headers, credentials: 'same-origin',
            body: body === undefined ? undefined : (json ? JSON.stringify(body) : body),
        });
        if (response.status === 401 || response.redirected && /\/login(\?|$)/.test(response.url)) {
            if (!expired) {
                expired = true;
                emit('sessionExpired', {status: response.status});
            }
            throw new AnalogicError('Authentication required', 401);
        }
        if (!response.ok) {
            let detail = null;
            try {
                detail = await response.clone().json();
            } catch (e) {
                detail = await response.text();
            }
            const message = (detail && detail.message) || (typeof detail === 'string' && detail) || response.statusText;
            const error = new AnalogicError(message, response.status, detail);
            emit('error', error);
            throw error;
        }
        if (raw) {
            return response;
        }
        // A TM1 write answers 204 with no body.
        const text = await response.text();
        if (!text) {
            return null;
        }
        const type = response.headers.get('Content-Type') || '';
        return type.includes('json') ? JSON.parse(text) : text;
    }

    const ctx = {
        version: VERSION,
        bundle: boot.bundle,
        config: Object.freeze({...(boot.config || {})}),
        dataSources: Object.freeze({...(boot.dataSources || {})}),
        // Helpers, so a bundle needs no import of this module's URL.
        utils: Object.freeze({cellsetRows, cellsetColumns}),

        /** {user, permissions} as the server sees them. refresh=true asks the server again. */
        async session(refresh = false) {
            if (!refresh) {
                return {user: boot.user, permissions: [...(boot.permissions || [])]};
            }
            const data = await request('bundle_session/' + encodeURIComponent(boot.bundle), {method: 'GET'});
            csrfToken = data.csrfToken || csrfToken;
            boot.user = data.user;
            boot.permissions = data.permissions;
            return {user: data.user, permissions: data.permissions};
        },

        hasPermission(permission) {
            return (boot.permissions || []).includes(permission);
        },

        /** Runs the repository.yml query named key on the server; params replace $name in it. */
        query(key, params = {}, {url = DEFAULT_QUERY_URL, keySuffix} = {}) {
            const body = {key, ...stringParams(params)};
            if (keySuffix) {
                body.key_suffix = keySuffix;
            }
            return request('proxy/' + url + (url.includes('?') ? '&' : '?') + 'server=1', {body});
        },

        /** A write through a repository.yml body, e.g. url "api/v1/Processes('x')/tm1.ExecuteWithReturn". */
        write(key, params = {}, {url, keySuffix} = {}) {
            if (!url) {
                return Promise.reject(new AnalogicError('write() needs the TM1 REST url of the repository entry.', 0));
            }
            return ctx.query(key, params, {url, keySuffix});
        },

        /** Raw MDX: only when the app allows client-side queries (allowClientSideQuery). */
        mdx(mdx, {url = DEFAULT_QUERY_URL} = {}) {
            return request('proxy/' + url, {body: {MDX: mdx}});
        },

        /** A TM1 REST GET below one of the manifest's dataSources.rest prefixes. */
        rest(path) {
            return request('proxy/' + path.replace(/^\/+/, ''), {method: 'GET'});
        },

        /** A custom_objects.json middleware object. */
        middleware(objectKey, payload = {}) {
            return request('middleware?object_key=' + encodeURIComponent(objectKey), {body: payload});
        },

        /** A custom_objects.json export; resolves with a Blob (download=true saves it as fileName). */
        async export(exportKey, payload = {}, {fileName = 'export.xlsx', download = true} = {}) {
            const response = await request('export?export_key=' + encodeURIComponent(exportKey)
                + '&file_name=' + encodeURIComponent(fileName), {body: payload, raw: true});
            const blob = await response.blob();
            if (download) {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                link.remove();
                setTimeout(() => URL.revokeObjectURL(link.href), 1000);
            }
            return blob;
        },

        /** Another bundle ({bundle: name}) or a widget page ({page: id, ...navigation values}) of this app. */
        navigate(target) {
            if (target && target.bundle) {
                window.location.href = base + 'b/' + encodeURIComponent(target.bundle);
            } else if (target && target.page) {
                window.location.href = base + '?p=' + encodeURIComponent(btoa(JSON.stringify(target)));
            } else {
                window.location.href = base;
            }
        },

        logout() {
            window.location.href = base + 'logout';
        },

        /** 'sessionExpired' | 'error' */
        on(event, fn) {
            (listeners[event] = listeners[event] || []).push(fn);
            return () => {
                listeners[event] = (listeners[event] || []).filter(x => x !== fn);
            };
        },
    };

    ctx.on('sessionExpired', () => {
        if ((listeners.sessionExpired || []).length === 1) {
            window.location.href = base;
        }
    });

    return Object.freeze(ctx);
}

/** The values of a TM1 cellset as rows: [{members: [..row member names], values: [..column cell values]}]. */
export function cellsetRows(cellset) {
    const axes = (cellset && cellset.Axes) || [];
    const columns = axes[0] ? axes[0].Tuples.length : 1;
    const rows = axes[1] ? axes[1].Tuples : [{Members: []}];
    const cells = (cellset && cellset.Cells) || [];
    return rows.map((tuple, r) => ({
        members: tuple.Members.map(m => m.Name),
        values: Array.from({length: columns}, (_, c) => {
            const cell = cells[r * columns + c];
            return cell ? cell.Value : null;
        }),
    }));
}

/** Column headers of a cellset: one array of member names per column tuple. */
export function cellsetColumns(cellset) {
    const axis = cellset && cellset.Axes && cellset.Axes[0];
    return axis ? axis.Tuples.map(t => t.Members.map(m => m.Name)) : [];
}
