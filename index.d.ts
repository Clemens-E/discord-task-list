declare module 'discord-task-list'
{
    export = MessageTasks;
    class MessageTasks {
        constructor(loading_emoji?: string, done_emoji?: string);
        newProgress(tasks: string[], msg: any): Task;
    }
    type Task = {
        next(): Promise<any>;
        start(): Promise<any>;
    }
}