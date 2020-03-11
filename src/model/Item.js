import { v4 as uuid } from 'uuid';

export default class Item {
    constructor(name, duration) {
        this.id = uuid()
        this.name = name
        this.duration = duration
        this.timeleft = duration
        this.active = false
    }
}