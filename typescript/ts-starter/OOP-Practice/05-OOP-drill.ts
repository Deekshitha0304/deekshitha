class Inheritance {
    constructor(protected result: number) {}

    inc(): this {
        this.result++;
        return this;
    }

    dec(): this {
        this.result--;
        return this;
    }

    value(): number {
        return this.result;
    }
}

class BoundedInh extends Inheritance {
    constructor(initial: number, private max: number) {
        super(initial);
        this.clamp();
    }

    inc(): this {
        super.inc();
        this.clamp();
        return this;
    }

    dec(): this {
        super.dec();
        this.clamp();
        return this;
    }

    private clamp() {
        if (this.result < 0) this.result = 0;
        if (this.result > this.max) this.result = this.max;
    }

}





//COMPOSITE VERSION

class BoundedCounter {
    constructor(private inner: Counter, private max: number) {}

    inc(): this {
        this.inner.inc();
        this.clamp();
        return this;
    }

    dec(): this {
        this.inner.dec();
        this.clamp();
        return this;
    }

    value(): number {
        return this.inner.value();
    }

    private clamp() {
        if (this.inner.value() < 0) {
            while (this.inner.value() < 0) this.inner.inc();
        }
        if (this.inner.value() > this.max) {
            while (this.inner.value() > this.max) this.inner.dec();
        }
    }
}
