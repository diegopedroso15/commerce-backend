function get_random_int(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function calcular_digito(cpf_parcial: string) {
    let soma = 0;
    for (let i = 0; i < cpf_parcial.length; i++) {
        soma += parseInt(cpf_parcial[i]) * (cpf_parcial.length + 1 - i);
    }
    return (11 - soma % 11) % 11 % 10;
}

export function generateCPF() {
    let cpf = '';
    for (let i = 0; i < 9; i++) {
        cpf += get_random_int(0, 9);
    }

    cpf += calcular_digito(cpf);
    cpf += calcular_digito(cpf);

    return cpf;
}