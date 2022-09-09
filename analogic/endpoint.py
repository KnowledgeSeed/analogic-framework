from flask import Blueprint
import typing as t
import os
from flask.scaffold import _sentinel


class AnalogicEndpoint(Blueprint):
    def __init__(
            self,
            name: str,
            import_name: str,
            static_folder: t.Optional[t.Union[str, os.PathLike]] = None,
            static_url_path: t.Optional[str] = None,
            template_folder: t.Optional[str] = None,
            url_prefix: t.Optional[str] = None,
            subdomain: t.Optional[str] = None,
            url_defaults: t.Optional[dict] = None,
            root_path: t.Optional[str] = None,
            cli_group: t.Optional[str] = _sentinel
    ):
        super().__init__(
            name=name,
            import_name=import_name,
            static_folder=static_folder,
            static_url_path=static_url_path,
            template_folder=template_folder,
            url_prefix=url_prefix,
            subdomain=subdomain,
            url_defaults=url_defaults,
            root_path=root_path,
            cli_group=cli_group,
        )
        self.endpoint_rules = []

    def analogic_endpoint_route(self, rule: str, **options: t.Any) -> t.Callable:
        def decorator(f: t.Callable) -> t.Callable:
            endpoint = options.pop("endpoint", None)
            self.add_analogic_url_rule(rule, endpoint, f, **options)
            self.add_url_rule(rule, endpoint, f, **options)
            return f

        return decorator

    def add_analogic_url_rule(
        self,
        rule: str,
        endpoint: t.Optional[str] = None,
        view_func: t.Optional[t.Callable] = None,
        provide_automatic_options: t.Optional[bool] = None,
        **options: t.Any,
    ) -> None:

        if endpoint and "." in endpoint:
            raise ValueError("'endpoint' may not contain a dot '.' character.")

        if view_func and hasattr(view_func, "__name__") and "." in view_func.__name__:
            raise ValueError("'view_func' name may not contain a dot '.' character.")

        self.endpoint_rules.append({
            'rule': rule,
            'endpoint': endpoint,
            'view_func': view_func,
            'provide_automatic_options': provide_automatic_options,
            'options': options
        })
