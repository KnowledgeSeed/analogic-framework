import os


def min_cmd(path, min_name, file_or_dir_names=[''], options=['r', 'v', 'b', 'o']):
    print(path)
    file_or_dir_names_str = ' '.join([path + f for f in file_or_dir_names])
    target = path + min_name
    cmd = 'minify.exe -' + ' -'.join(options) + ' ' + target + ' ' + file_or_dir_names_str
    os.system(cmd)
    f = open(target, 'r', encoding='utf-8')
    content = f.read()
    f.close()
    f = open(target, 'w', encoding='utf-8')
    f.write(content)
    f.close()


base_path = '..\\..\\'
assets_path = base_path + 'DimensionFramework\\static\\assets\\'
css_path = assets_path + 'css\\'
skins_path = assets_path + 'skins\\'
js_path = assets_path + 'js\\'
configs_path = js_path + 'configs\\'

os.system('del ' + base_path + 'minified*.css /s /q /f')
os.system('del ' + base_path + 'minified*.js /s /q /f')

min_cmd(css_path, 'minified.css', ['bootstrap-grid.min.css', 'lib', 'widgets'])

min_cmd(css_path, 'minified.style.css', ['style.css'], ['v', 'b', 'o'])

with os.scandir(skins_path) as entries:
    for entry in entries:
        min_cmd(skins_path + entry.name + '\\css\\', 'minified.css')

min_cmd(js_path, 'minified.js',
        ['lib', 'framework\\app.js', 'framework\\utils.js', 'framework\\render.js', 'framework\\listener.js',
         'framework\\api.js', 'framework\\shout.js', 'exports', 'tm1', 'widgets\\base', 'widgets\\new',
         'widgets\\loader.js'])

min_cmd(js_path, 'minified_deprecated.js', ['widgets\\deprecated'])

with os.scandir(configs_path) as entries:
    gen = (x for x in entries if x.name not in ['default', 'dummy'])
    for entry in gen:
        min_cmd(configs_path + entry.name + '\\', 'minified.js', ['repository.js', 'event-map.js', 'widget-config.js'])
