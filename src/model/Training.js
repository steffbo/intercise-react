import uuid from 'uuid'
import Item from './Item'

export default class Training {

    constructor(name) {
        this.id = uuid()
        this.name = name
        this.items = []
    }

    getRuntime() {
        for (let item in this.items) {
            item.name
        }

    }
}