from analogic import create_app
import os
from analogic import monitor

site_root = os.path.realpath(os.path.dirname(__file__))
app = create_app(site_root)
#monitor.start()



@app.route('/test', defaults={'instance': 'default'}, methods=['GET', 'POST'])
@app.route('/<path:instance>/test', methods=['GET', 'POST'])
def test(instance):
    return instance


if __name__ == "__main__":
    app.run()
