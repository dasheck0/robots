const dmg = (a, d) => (3 * 10.0 * a / d) / 50.0 + 2
const dmg2 = (a, d) => a * a / (a + d)
const dmg3 = (a, d) => ( 2 * a - d) * 0.5

const calc = (foo) => {
    for (let a = 5; a < 256; a += 10) {
        for (let d = 5; d < 256; d += 10) {
            console.log('a', a, 'd', d, foo(a, d));
        }
    }
}

calc(dmg2)