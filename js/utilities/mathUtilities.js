/**
 * Created by s.neidig on 19/07/17.
 */

const calculateDamage = (attack, defense) => {
    const baseDamage = Math.pow(attack, 3) / 32 + 32;
    const damageReduction = Math.pow(defense - 280.4, 2) / 110 + 16;
    const baseDamage2 = baseDamage * damageReduction / 730;

    return baseDamage2 * (730 - (defense * 51 - Math.pow(defense, 2) / 11) / 10) / 7300;
}

const calculateDamage2 = (attack, defense) => {
    return attack * attack / (attack + defense);
}

const mod = (number, mod) => ((number % mod) + mod) % mod;

const randomBoolean = () => randomInteger(10) < 5;