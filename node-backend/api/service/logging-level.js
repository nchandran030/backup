/**
 * Description: This class is used for Setting The Logging Level
 */
const loggingLevel = 'debug';

class LoggingLevel {

    constructor() {
        console.log('LoggingLevel');
        this.x;
    }

    /**
     * This static function is used to create a singleton object
     * return type of method is instance of class
     */
    static makeObject() {
        if (!this.x) {
            this.x = new LoggingLevel();
        }
        return this.x;
    }

    /**
     * This function is used to return Logging Level
     */
    getLoggingLevel() {
        return loggingLevel;
    }

}
module.exports = LoggingLevel;