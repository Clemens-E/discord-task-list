import { Message } from "discord.js";

declare module 'discord-task-list'
{
    export = MessageTasks;
    class MessageTasks {
        constructor(loading_emoji?: string, done_emoji?: string);
        newProgress(tasks: string[], msg: Message): Task;
    }
}

declare type Task = {
    next(): Promise<Message>;
    start(): Promise<Message>;
}


