let decimal_places = 6;
function round_to(n, digits) {
    if (digits === undefined) {
        digits = 0;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    return Math.round(n) / multiplicator;
}
function $(selector) {
    return document.querySelector(selector);
}
function set_results(result_obj) {
    let results_container = $("#results_container");
    results_container.innerHTML = `
    <div class="two_column_grid width_full margin_medium">
        <span class="flex_vertical flex_align_center">Total token amount: </span>
        <span class="card">${result_obj.final_token_amount}</span>
    </div>
    <div class="two_column_grid width_full margin_medium">
        <span class="flex_vertical flex_align_center">Total reward amount: </span>
        <span class="card">${result_obj.total_reward_amount}</span>
    </div>
    <div class="two_column_grid width_full margin_medium">
        <span class="flex_vertical flex_align_center">Token increase percentage</span>
        <span class="card">${result_obj.token_increase_percentage}%</span>
    </div>

    `;
}
function calc_staked_token_amount(amount_of_tokens, apy, reward_interval, stake_duration) {
    let final_token_amount = amount_of_tokens;
    let reward_percentage_per_interval = ((apy / (365 / reward_interval)) / 100);
    let day_counter = reward_interval;
    let total_reward_amount = 0;
    for (day_counter; day_counter <= stake_duration; day_counter += reward_interval) {
        let reward = final_token_amount * reward_percentage_per_interval;
        final_token_amount += reward;
        total_reward_amount += reward;
    }
    let token_increase_percentage = ((final_token_amount - amount_of_tokens) / amount_of_tokens) * 100;
    let output_obj = {
        final_token_amount: final_token_amount,
        token_increase_percentage: token_increase_percentage,
        total_reward_amount: total_reward_amount
    };
    return output_obj;
}
function reset() {
    $("#num_of_tokens").classList.remove("is-invalid");
    $("#apy").classList.remove("is-invalid");
    $("#reward_interval").classList.remove("is-invalid");
    $("#stake_duration").classList.remove("is-invalid");
    let results_container = $("#results_container");
    results_container.innerHTML = "";
}
function validate_input(amount_of_tokens, apy, reward_interval, stake_duration) {
    let positive_number_regex = new RegExp("^((0|([1-9][0-9]*))(\.[0-9]+)?)$");
    let amount_of_tokens_correct = positive_number_regex.exec(amount_of_tokens) != null;
    let apy_correct = positive_number_regex.exec(apy) != null;
    let reward_interval_correct = positive_number_regex.exec(reward_interval) != null;
    let stake_duration_correct = positive_number_regex.exec(stake_duration) != null;
    return [amount_of_tokens_correct, apy_correct, reward_interval_correct, stake_duration_correct];
}
function on_calculate_btn_click() {
    reset();
    let amount_of_tokens, apy, reward_interval, stake_duration;
    amount_of_tokens = $("#num_of_tokens").value;
    apy = $("#apy").value;
    reward_interval = $("#reward_interval").value;
    stake_duration = $("#stake_duration").value;
    let correct_array = validate_input(amount_of_tokens, apy, reward_interval, stake_duration);
    if (correct_array.includes(false)) {
        if (correct_array[0] === false) {
            $("#num_of_tokens").classList.add("is-invalid");
        }
        if (correct_array[1] === false) {
            $("#apy").classList.add("is-invalid");
        }
        if (correct_array[2] === false) {
            $("#reward_interval").classList.add("is-invalid");
        }
        if (correct_array[3] === false) {
            $("#stake_duration").classList.add("is-invalid");
        }
    }
    else {
        amount_of_tokens = Number(amount_of_tokens);
        apy = Number(apy);
        reward_interval = Number(reward_interval);
        stake_duration = Number(stake_duration);
        let result_obj = calc_staked_token_amount(amount_of_tokens, apy, reward_interval, stake_duration);
        set_results(result_obj);
    }
}
$("#calculate_btn").onclick = on_calculate_btn_click;
