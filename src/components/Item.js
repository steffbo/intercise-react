import uuid from 'uuid'

export default class Item {

    constructor(name, type, duration, category) {
        this.id = uuid()
        this.name = name
        this.type = type
        this.duration = duration
        this.timeleft = duration
        this.active = false
        this.isEditable = false
        this.category = category
    }
}