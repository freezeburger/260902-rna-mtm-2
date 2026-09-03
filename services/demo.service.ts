

class Demo{


    private logger() {
        console.log('demo');
    }

    constructor() {
        setInterval(() => this.logger(), 1000);
    }
}

new Demo();