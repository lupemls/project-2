$(document).ready(function () {
    const weapons = [{ src: 'images/Rock.jpg', alt: 'rock' }, { src: 'images/paper.jpg', alt: 'paper' }, { src: 'images/scissor.jpg', alt: 'scissor' }];
    const accounts = ['VioletShirokuma', 'onijimbo', 'lupemls', 'greiven'];
    const opponentAdj = ['DEADLY', 'MERCILESS', 'ABOMINABLE', 'LETHAL', 'BRUTAL'];
    const playerAdj = ['SWIFT', 'CUNNING', 'STOIC', 'BRAVE', 'BOLD'];

    
    let wins = 0;
    let ties = 0;
    let loses = 0;

    let round = 1;
    let srcChange;
    let currentOp;

    const randoAdj = Math.floor(Math.random() * (playerAdj.length));

    function playerCall() {
        $.ajax({
            url: `https://api.github.com/users/${accounts[3]}`,
            method: 'get'
        })
            .then(function (response1) {
                $('#player').text(`${response1.login} THE ${playerAdj[randoAdj]}`);
                $('#playerImg').attr({ 'src': response1.avatar_url });
            });
    };

    playerCall()

    // this gets the github info for player and opponent 
    function gitHubCall() {
        // this is the call to the rps_dp
        $.ajax({
            url: '/api/randomopponent',
            method: 'get'
        })
            .then(function (response) {
                // console.log(response);
                currentOp = response.id

                $.ajax({
                    url: `https://api.github.com/users/${response.github}`,
                    method: 'get'
                })
                    .then(function (response2) {
                        // console.log(response1)

                        $('#opponent').text(`${response2.login} THE ${opponentAdj[randoAdj]}`);
                        $('#opponentImg').attr({ 'src': response2.avatar_url });
                    });
            });

    };

    function winIncrementOp(){
        $.ajax({
            url: '/api/winincrement',
            data: {id: currentOp},
            method: 'put'
        })
    };

    function lossIncrementOp(){
        $.ajax({
            url: '/api/lossincrement',
            data: {id: currentOp},
            method: 'put'
        })
    };



    function nudgeRight() {
        $('#opponentImg').animate({
            marginLeft: '+=3em'

        }, 'fast').animate({
            marginLeft: '-=3em'
        }, 'fast', function(){ nextOp() });
    };

    function nudgeLeft() {
        $('#playerImg').animate({
            marginRight: '+=3em'

        }, 'fast').animate({
            marginRight: '-=3em'
        }, 'fast', function(){ nextOp() });
    };

    // displays win lose or tie to the results span 'element'
    function win() {
        $('#result').show()
        $('#result').text('WIN!');

        lossIncrementOp()
        $('#result').fadeOut(2000);

    };

    function lose() {
        $('#result').show()
        $('#result').text('LOSE!');

        winIncrementOp()
        $('#result').fadeOut(2000);

    };

    function tie() {
        $('#result').show()
        $('#result').text('TIE!');

        
        $('#result').fadeOut(2000);

    };
    // this populates the dom with the game when start button is clicked
    $("#start").on('click', function () {
        $("#wrapper").show('fast')
        $('#start').addClass('hidden')
        gitHubCall()

    });

    // randomizes opponents choice
    function randoWeapon() {
        const randoIndex = Math.floor(Math.random() * (weapons.length));
        $("#opWeapon").attr({
            'src': weapons[randoIndex].src,
            'alt': weapons[randoIndex].alt
        });
    };

    // this cycles through r p s images
    function carousel() {
        let i = 0
        srcChange = setInterval(function () {
            $("#opWeapon").attr({ 'src': weapons[i].src })
            i++
            if (i > 2) {
                i = 0
            }
        }, 500)

    };

    function nextOp() {
        $('#opCard').fadeOut(2500, function () { $('#nextOp').show('fast') })
        round = 1;
        wins = 0;
        loses = 0
    };

    // displays wins and loses amount
    function statsView() {
        $('#round').text(round);
        $('#wins').text(wins);
        $('#loses').text(loses);
        $('#tie').text(ties);
    };


    // logic for the r p s game
    function game() {
        let choice = $('.selected').attr('alt');
        let opW = $('#opWeapon').attr('alt');
        
        
        if (choice === opW) {
            console.log('tie')
            ties++

            tie()
        }
        else if (choice === 'rock' && opW === 'scissor') {
            console.log('win');
            wins++

            win()
            nudgeRight()
        }
        else if (choice === 'scissor' && opW === 'paper') {
            console.log('win');
            wins++
            
            win()
            nudgeRight()
        }
        else if (choice === 'paper' && opW === 'rock') {
            console.log('win');
            wins++

            win()
            nudgeRight()
        }
        else if (choice === 'rock' && opW === 'paper') {
            console.log('lose');
            loses++

            lose()
            nudgeLeft()
        }
        else if (choice === 'scissor' && opW === 'rock') {
            console.log('lose');
            loses++

            lose()
            nudgeLeft()
        }
        else if (choice === 'paper' && opW === 'scissor') {
            console.log('lose');
            loses++

            lose()
            nudgeLeft()
        }
        
    };


    statsView()



    $('#weapons').on('click', 'img', function () {
        $('.weapon').removeClass('selected')
        $(this).addClass('selected');

    });

    // runs game logic when image for the player card is selected. going to change it soon to run game when the shoot button is clicked
    $('#shoot').on('click', function () {
        round++

        clearInterval(srcChange)
        randoWeapon()
        game()

        $('#shoot').hide('fast').delay(2000).show('fast', function () { carousel() });

        statsView()
    });

    $('#nextOp').on('click', function () {
        $('#opCard').show('fast', gitHubCall());
        $('#nextOp').hide('fast');
        statsView()
    });

    carousel()
});