// AJOUTE LE RANDOM INTEGER
function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random()*(max - min + 1))
}


// INITIALISATION DES PARAMETRES
var NB_DICE_SIDE = 6;
let SCORING_DICE_VALUE = [1, 5];
let SCORING_MULTIPLIER = [100, 50];

let THRESHOLD_BONUS = 3;
let STD_BONUS_MULTIPLIER = 100;
let ACE_BONUS_MULTIPLIER = 1000;

let DEFAULT_DICES_NB = 6;





// LANCER DE DÉS ET OCCURENCES
function roll_dice_set(nb_dice_to_roll) {
  const dice_value_occurrence = new Array(NB_DICE_SIDE).fill(0);
  let dice_index = 0;

  while (dice_index < nb_dice_to_roll){
    const dice_value = generateRandomInteger(1, NB_DICE_SIDE);
    dice_value_occurrence[dice_value - 1] += 1;
    dice_index += 1;
  };

  return dice_value_occurrence;
};




// ANALYSE DU SCORE BONUS
function analyse_bonus_score(dice_value_occurrence) {

  const scoring_dice_value_occurrence = new Array(NB_DICE_SIDE).fill(0);
  let bonus_score = 0;
  let side_value_index = 0;
  
  console.log(dice_value_occurrence);

  while (side_value_index < dice_value_occurrence.length){

    const side_value_occurrence = dice_value_occurrence[side_value_index]

    const nb_of_bonus = Math.floor(side_value_occurrence / THRESHOLD_BONUS);

    if (nb_of_bonus > 0){
      if (side_value_index == 0){
          let bonus_multiplier = (side_value_index == 0) ? ACE_BONUS_MULTIPLIER : STD_BONUS_MULTIPLIER;
          bonus_score += nb_of_bonus * bonus_multiplier * (side_value_index + 1)
        
          dice_value_occurrence[side_value_index] %= THRESHOLD_BONUS;
          scoring_dice_value_occurrence[side_value_index] = nb_of_bonus * THRESHOLD_BONUS;
        }
      
        side_value_index += 1;

    }

    return {
      'score': bonus_score,
      'scoring_dice': scoring_dice_value_occurrence,
      'non_scoring_dice': dice_value_occurrence
    };
  };
};





// ANALYSE DU SCORE STANDARD
function analyse_standard_score(dice_value_occurrence) {
  let scoring_dice_value_occurrence = new Array(NB_DICE_SIDE).fill(0);

  let standard_score = 0;
  let scoring_dice_value_index = 0;
  while (scoring_dice_value_index < SCORING_DICE_VALUE.length) {
      let scoring_value = SCORING_DICE_VALUE[scoring_dice_value_index];
      let scoring_multiplier = SCORING_MULTIPLIER[scoring_dice_value_index];

      standard_score += dice_value_occurrence[scoring_value - 1] * scoring_multiplier;

      scoring_dice_value_occurrence[scoring_value - 1] = dice_value_occurrence[scoring_value - 1];
      dice_value_occurrence[scoring_value - 1] = 0;

      scoring_dice_value_index += 1;
  }

  return {'score': standard_score,
          'scoring_dice': scoring_dice_value_occurrence,
          'non_scoring_dice': dice_value_occurrence
  };
}





// ANALYSE DU SCORE TOTAL
function analyse_score(dice_value_occurrence) {

  analyse_score_bonus = analyse_bonus_score(dice_value_occurrence)
  score_bonus = analyse_score_bonus['score']
  scoring_dice_from_bonus = analyse_score_bonus['scoring_dice']
  non_scoring_dice_from_bonus = analyse_score_bonus['non_scoring_dice']

  analyse_score_std = analyse_standard_score(non_scoring_dice_from_bonus)
  score_std = analyse_score_std['score']
  scoring_dice_from_std = analyse_score_std['scoring_dice']
  non_scoring_dice_from_std = analyse_score_std['non_scoring_dice']

  const scoring_dice_value_occurrence = Array(NB_DICE_SIDE).fill(0);
  let side_value_index = 0;

  while (side_value_index < NB_DICE_SIDE) {
      scoring_dice_value_occurrence[side_value_index] = scoring_dice_from_bonus[side_value_index] + scoring_dice_from_std[side_value_index];
      side_value_index++;
  }


  return {'score': score_std + score_bonus,
          'scoring_dice': scoring_dice_value_occurrence,
          'non_scoring_dice': non_scoring_dice_from_std
  };
}










// TOURS DU JEU
function game_turn(is_interactive=true) {

  let remaining_dice_to_roll = DEFAULT_DICES_NB;
  let roll_again = true;
  let turn_score = 0;

  while (roll_again) {
      // generate the dice roll and compute the scoring
      const dice_value_occurrence = roll_dice_set(remaining_dice_to_roll);
      const roll_score = analyse_score(dice_value_occurrence);
      remaining_dice_to_roll = roll_score['non_scoring_dice'].reduce((a, b) => a + b, 0);

      if (roll_score['score'] === 0) {
          // lost roll
          console.log('\n-->', 'got zero point ', turn_score, 'lost points\n');
          roll_again = false;
          turn_score = 0;
      } else {
          // scoring roll
          turn_score += roll_score['score'];

          // In case of scoring roll and no remaining dice to roll the player can roll again the full set of dices
          if (remaining_dice_to_roll === 0) {
              remaining_dice_to_roll = DEFAULT_DICES_NB;
              // console.log('-->Full Roll');
          }

          console.log('Roll Score=', roll_score['score'], 'potential turn score=', turn_score, 'remaining dice=', remaining_dice_to_roll);

          // choice to roll again or stop and take roll score
          if (is_interactive) {
              // interactive decision for real game
              const stop_turn = prompt("Do you want to roll this dice ? [y/n] ") === "n";
              if (stop_turn) {
                  console.log('\n-->', 'Scoring turn with', turn_score, 'points\n');
                  roll_again = false;
              }
          } else {
              // random decision for game simulation (50/50)
              const stop_turn = (Math.floor(Math.random() * 2) === 0);
              if (stop_turn) {
                  console.log('\n-->', 'Scoring turn with', turn_score, 'points\n');
                  roll_again = false;
              }
          }
      }
  }

  return turn_score;
}

game_turn(true);