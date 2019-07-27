/**
 *Shows progress of various Tasks
 * @private
 * @class MessageProgress
 */
class MessageProgress {

    /**
     *Creates an instance of MessageProgress.
     * @param {Array<string>} tasks the name of the tasks that should be done
     * @param {*} message the discord.js message that needs to be edited
     * @param {string} done_emoji an emoji to show when the task is done
     * @param {string} loading_emoji an emoji to show when the task is not done yet
     * @memberof MessageProgress
     */
    constructor(tasks, message, done_emoji, loading_emoji) {
        if (!Array.isArray(tasks)) throw new TypeError('tasks has to be an array, but got ' + typeof tasks);
        if (typeof message === 'undefined' || typeof message.edit !== 'function') throw new TypeError('message is not a valid message');

        this.tasks = tasks.map(x => ({
            done: false,
            msg: x
        }));
        this.message = message;
        this.currentIndex = 0;
        this.check_emoji = done_emoji || '`✅`';
        this.loading_emoji = loading_emoji || '`❌`';
    }

    /**
     *Edits the next task as done and edits the message
     *  
     * @returns {Promise<object>} The Promise of the message edit
     * @memberof MessageProgress
     */
    next() {
        if (this.tasks.length < this.currentIndex) return;
        this.tasks[this.currentIndex].done = true;
        this.currentIndex++;
        return this.message.edit(this.format());
    }

    /**
     *Edits the message with every task undone
     *
     * @returns {Promise<object>} The Promise of the message edit
     * @memberof MessageProgress
     */
    start() {
        return this.message.edit(this.format());
    }

    /**
     *Formats the tasks with emojis
     *
     * @returns {string} The formatted string with the emojis
     * @memberof MessageProgress
     */
    format() {
        return this.tasks.map(x => `${x.done ? this.check_emoji : this.loading_emoji}  ${x.msg}`).join('\n');
    }
}

/**
 *Manages the emojis for MessageProgress
 *
 * @class MessageTasks
 */
class MessageTasks {

    /**
     *Creates an instance of MessageTasks.
     * @param {string} done_emoji an emoji to show when the task is done, it is used every time you use newProgress
     * @param {string} loading_emoji an emoji to show when the task is not done yet, it is used every time you use newProgress
     * @memberof MessageTasks
     */
    constructor(loading_emoji, done_emoji) {
        this.loading_emoji = loading_emoji;
        this.done_emoji = done_emoji;
    }

    /**
     *Creates a new instance of MessageProgress and supplies the emojis you used in the constructor
     *
     * @param {Array<string>} tasks An array of strings that represents the Tasks by name
     * @param {object} msg the discord.js message to edit
     * @returns {instance of MessageProgress} new Instance of MessageProgress
     * @memberof MessageTasks
     */
    newProgress(tasks, msg) {
        return new MessageProgress(tasks, msg, this.done_emoji, this.loading_emoji);
    }
}

module.exports = MessageTasks;