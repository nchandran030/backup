/**
 * Description: This class is used for executing window commands.
 */
const promise = require('promise');
var cmd = require('node-cmd');
var executeCommands = [];
var exec = require('child_process').exec;

class WindowCommands {

    constructor() {
        console.log('WindowCommands');
        this.x;
    }

    /**
     * This static function is used to create a singleton object
     * return type of method is instance of class
     */
    static makeObject() {
        if (!this.x) {
            this.x = new WindowCommands();
        }
        return this.x;
    }

    /**
     * This function is used to execute commands
     * return type of method is promise
     */
    executeCommands(commands) {
        console.log('WindowCommands|executeCommands ', commands);
        try {
            return new Promise((resolve, reject) => {
                exec(commands, function (error, stdout, stderr) {
                    if (error) {
                        resolve({ 'status': false, 'message': error.message });
                    } else {
                        executeCommands.push(commands);
                        resolve({ 'output': stdout, 'executedCommands': executeCommands, 'status': true });
                    }
                });
            });
        } catch (err) {
            console.log('Error Occured in WindowCommands|executeCommands ', err);
        }
    }

    /**
     * This function is used to get executed commands list
     * return type of method is promise
     */
    getExecutedCommands(commands) {
        console.log('WindowCommands|getExecutedCommands ', commands);
        try {
            return new Promise((resolve, reject) => {
                resolve(executeCommands);
            })
        } catch (err) {
            console.log('Error Occured in WindowCommands|executeCommands ', err);
        }
    }
}
module.exports = WindowCommands;