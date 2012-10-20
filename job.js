var gear = require('gear'),
    queue = new gear.Queue({
        registry: new gear.Registry({
            module: 'gear-lib'
        })
    });

queue.read('text-select.js').jslint().jsminify().write('ts.min.js').run();
