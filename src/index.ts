let decimal_places = 6;
function round_to(n: number, digits: number): number {
    if (digits === undefined) {
        digits = 0;
    }

    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    return Math.round(n) / multiplicator;
}

interface staked_token_output{
    final_token_amount: number,
    total_reward_amount: number,
    token_increase_percentage: number
}

function calc_staked_token_amount(
    amount_of_tokens: number,
    apy: number,
    reward_interval: number,
    stake_duration: number
): staked_token_output {
    let final_token_amount = amount_of_tokens;
    let reward_percentage_per_interval = ((apy / (365 / reward_interval)) / 100)
    let day_counter = reward_interval;
    let total_reward_amount = 0;
    for(day_counter; day_counter <= stake_duration; day_counter += reward_interval){
        let reward = final_token_amount * reward_percentage_per_interval;
        final_token_amount += reward;
        total_reward_amount += reward;
        
    }
    let token_increase_percentage = ((final_token_amount - amount_of_tokens) / amount_of_tokens) * 100;
    let output_obj: staked_token_output = {
        final_token_amount: final_token_amount,
        token_increase_percentage: token_increase_percentage,
        total_reward_amount: total_reward_amount
    }
    console.log(output_obj);
    return output_obj;
}

calc_staked_token_amount(32.456, 6, 1, 735);