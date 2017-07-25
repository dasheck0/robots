/**
 * Created by s.neidig on 22/07/17.
 */

const parseRule = (rule) => {
    return rule.substr(1).split('$');
}

const structure = () => {
    return {
        vowel: ['a', 'e', 'i', 'o', 'u', 'y'],
        start: ['Aer', 'Al', 'Am', 'An', 'Ar', 'Arm', 'Arth', 'B', 'Bal', 'Bar', 'Be', 'Bel', 'Ber', 'Bok', 'Bor', 'Bran', 'Breg', 'Bren', 'Brod', 'Cam', 'Chal', 'Cham', 'Ch', 'Cuth', 'Dag', 'Daim', 'Dair', 'Del', 'Dr', 'Dur', 'Duv', 'Ear', 'Elen', 'Er', 'Erel', 'Erem', 'Fal', 'Ful', 'Gal', 'G', 'Get', 'Gil', 'Gor', 'Grin', 'Gun', 'H', 'Hal', 'Han', 'Har', 'Hath', 'Hett', 'Hur', 'Iss', 'Khel', 'K', 'Kor', 'Lel', 'Lor', 'M', 'Mal', 'Man', 'Mard', 'N', 'Ol', 'Radh', 'Rag', 'Relg', 'Rh', 'Run', 'Sam', 'Tarr', 'T', 'Tor', 'Tul', 'Tur', 'Ul', 'Ulf', 'Unr', 'Ur', 'Urth', 'Yar', 'Z', 'Zan', 'Zer'],
        middle: ['de', 'do', 'dra', 'du', 'duna', 'ga', 'go', 'hara', 'kaltho', 'la', 'latha', 'le', 'ma', 'nari', 'ra', 're', 'rego', 'ro', 'rodda', 'romi', 'rui', 'sa', 'to', 'ya', 'zila'],
        end: ['bar', 'bers', 'blek', 'chak', 'chik', 'dan', 'dar', 'das', 'dig', 'dil', 'din', 'dir', 'dor', 'dur', 'fang', 'fast', 'gar', 'gas', 'gen', 'gorn', 'grim', 'gund', 'had', 'hek', 'hell', 'hir', 'hor', 'kan', 'kath', 'khad', 'kor', 'lach', 'lar', 'ldil', 'ldir', 'leg', 'len', 'lin', 'mas', 'mnir', 'ndil', 'ndur', 'neg', 'nik', 'ntir', 'rab', 'rach', 'rain', 'rak', 'ran', 'rand', 'rath', 'rek', 'rig', 'rim', 'rin', 'rion', 'sin', 'sta', 'stir', 'sus', 'tar', 'thad', 'thel', 'tir', 'von', 'vor', 'yon', 'zor'],
        rule: '$start$vowel$35$middle$10$middle$end'
    };
}

const randomInteger = (max) => {
    return Math.floor(Math.random() * max);
}

const isNameValid = (name)

const shortenName = (name, length = 10) => {
    if (name.length > length) {
        return name.substring(0, length) + '...';
    } else {
        return name;
    }
};

const getRandomName = () => {
    const rule = parseRule(structure().rule);
    const ruleCount = rule.length;
    let name = '';

    for (let i = 0; i < ruleCount; i++) {
        const percent = parseInt(rule[i]);
        if (isNaN(percent)) {
            if (rule[i] === '_') {
                name += ' ';
            } else {
                const segCount = structure()[rule[i]].length;
                name += structure()[rule[i]][randomInteger(segCount)];
            }
        } else if (randomInteger(100) > percent && i < (ruleCount - 1)) {
            i += 1;
        }
    }

    return name.replace(/^\s+|\s+$/g, "");
}