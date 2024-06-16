
/*--------loader script-----------*/
$(function(){
    var loading = $('#loadbar').hide();
    $(document)
    .ajaxStart(function () {
        loading.show();
    }).ajaxStop(function () {
        loading.hide();
    });
    
    var vatta = 0; var pitta = 0; var kapha = 0;
    var Dosha = "Vatta";
    var questionNo = 0;
    var correctCount = 0;
    var q = [
        {'Q':'How is your body structure?', 'A':2,'C':['Thin & lean','Medium & proportionate','Large & well-built']},
        {'Q':'How is your appetite?', 'A':2,'C':['Irregular: I feel hungry sometimes and other times I do not','Regular: I feel hunger strongly every few hours and need food at regular intervals','Steady: I do not feel hungry for a few hours, I can miss meals, but do not like to. I tend towards emotional eating.']},
        {'Q':'What is your hair texture like?', 'A':2,'C':['Thin, tends to be dry, split ends','Medium thickness, tends to thin out, more hair fall','Thick, luscious, tends to be more greasy than dry']},
        {'Q':'How is your skin?', 'A':2,'C':['Dry, thin, & rough','Sensitive - oily/sometimes I am prone to acne, inflammation, pimples, sweat more','Oily/combination - I rarely use moisturiser/do not feel like it. My skin tends to be well hydrated, smooth and soft - moist/greasy']},
        {'Q':'My lifelong weight tendency has been ', 'A':2,'C':['I am thin and find it difficult to gain weight','Steady, medium, consistent and it reflects my efforts - easy to put on, easy to lose','Slightly overweight - I have a stocky build and can gain weight easily - difficulty to lose weight']},
        {'Q':'How do you respond to climate?', 'A':2,'C':['I tend to feel extremely cold easily ','I cannot stand extreme heat and tend to overheat easily','Neutral, but I prefer warm climates - aversion to moist rainy and cool weather']},
        {'Q':'How do you sleep?', 'A':2,'C':['I sleep fewer hours than normal, and my sleep tends to get disturbed. I am a light sleeper - interrupted ','Moderately. I usually sleep between 6-8 hours ','I can easily sleep for over 8 hours. My sleep tends to be heavy, long and deeply restful - sleepy & lazy']},
        {'Q':'How is your stamina?', 'A':2,'C':['Delicate - I feel exhausted easily in the evenings, after not doing much work','Moderate, but I have a strong will and can do anything I set my mind to','Incredible, but I am sometimes hesitant to push myself and test it. Excellent energy']},
        {'Q':'Mentally, I tend to be ', 'A':2,'C':['Flexible, creative, restless, quick','Strong, determined, competitive, ambitious, smart, intellect aggressive','Calm, stable, steady, loving, reliable']},
        {'Q':'How are you as a learner?', 'A':2,'C':['I learn quickly, but also forget quickly','I am sharp and learn whatever I set my mind to','It takes me time to learn something but once I do I never forget it']},
        {'Q':'I am...', 'A':2,'C':['Creative, free-willed, excited, quick, restless','Ambitious, driven, analytical','Warm, loving, kind, calm, stable']},
        {'Q':'What feelings are you most prone to?', 'A':2,'C':['Feeling anxious, nervous, fear, worry','Impatience, irritability, frustration, aggression','Lethargy, lack of motivation, slightly depressed, slow moving, calm reclusive']},
        {'Q':'What are you prone to?', 'A':2,'C':['Pain my my joints, cracking joints','Acidity, Acid reflux','Prone to mucus formation in the nose, sinus, nose to chest related issues']},
        {'Q':'How are your stools?', 'A':2,'C':['Dry and hard scanty, tend to constipation','soft, loose stools','Heavy, thick, Sticky, oily, regular']},
        {'Q':'How is your digestion', 'A':2,'C':['Delicate - I cannot tolerate all foods, sometimes its great and other times it acts up','Strong - I can tolerate most foods and my metabolism is fast','Slow - I feel tired after meals']},
        {'Q':'What is your personality?', 'A':2,'C':['idealistic, creative, free flowing','Goal oriented, competitive, ambitious','Calm, peaceful, slow, loyal']},
        {'Q':'How do you tend to be in difficulty?', 'A':2,'C':['Nervous, anxious, worried & irritable','Impatient & aggressive','I am sometimes depressive, tend to avoid my emotions and avoid uncomfortable situations']},
        {'Q':'Hunger', 'A':2,'C':['Irregular, anytime','Sudden hunger pangs, sharp hunger','Can skip any meal easily']},
        {'Q':'Mood', 'A':2,'C':['Changes quickly and have frequent mood swings','Eats at moderate speed','Stable']},
        // {'Q':'Communications skills', 'A':2,'C':['Fast, irrelevant, speech not clear','Good speaker with genuine argumentative skills','Authoritative, firm and little speech']}

    ];

 
    $(document.body).on('click',"label.element-animation",function (e) {
    //ripple start
        var parent, ink, d, x, y;       
         parent = $(this);
        if(parent.find(".ink").length == 0)
            parent.prepend("<span class='ink'></span>");
            
        ink = parent.find(".ink");
        ink.removeClass("animate");
        
        if(!ink.height() && !ink.width())
        {
            d = Math.max(parent.outerWidth(), parent.outerHeight());
            ink.css({height: "100px", width: "100px"});
        }
        
         x = e.pageX - parent.offset().left - ink.width()/2;
        y = e.pageY - parent.offset().top - ink.height()/2;
        
        ink.css({top: y+'px', left: x+'px'}).addClass("animate");
    //ripple end

        var choice = $(this).parent().find('input:radio').val();
        if (choice==1)
                vatta++;
        if (choice==2) 
                pitta++;
        if (choice==3)
                kapha++;

        if(vatta>pitta && vatta>kapha)
        {
            Dosha = "Vatta";
        }
        else if(pitta>vatta && pitta>kapha)
        {
            Dosha = "Pitta";
        }
        else if(kapha>vatta && kapha>pitta)
        {
            Dosha = "Kapha";
        }
        
        setTimeout(function(){
            $('#loadbar').show();
            $('#quiz').fadeOut();
            questionNo++;
            if((questionNo + 1) > q.length){
                alert("Quiz completed, Now click ok to get your answer");
                $('label.element-animation').unbind('click');
                setTimeout(function(){

                    if(Dosha=="Vatta")
                        var toAppend = '<tr><td>The Vata dosha comprises of the following elements - air and ether. This means that the individual will exhibit the qualities of these elements</td><td valign="middle"><a target="_blank" class="btn btn-primary" href="https://google.com" role="button">Read More</a></td></tr>';
                    if(Dosha=="Pitta")
                        var toAppend = '<tr><td>The Pitta dosha comprises of the following elements - fire and water. Fire is more predominant, and those people with a dominant Pitta nature have many of the qualities of fire within them.</td><td valign="middle"><a target="_blank" class="btn btn-primary" href="https://google.com" role="button">Read More</a></td></tr>';
                    if(Dosha=="Kapha")
                        var toAppend = '<tr><td>The Kapha dosha comprises of the following elements - water and earth. Like these elements, Kapha tends to be cool, moist, stable and heavy.</td><td valign="middle"><a target="_blank" class="btn btn-primary" href="https://google.com" role="button">Read More</a></td></tr>';


                    $('#quizResult').html(toAppend);
                    $('#totalCorrect').html("Your Dosha: "+ Dosha);
                    $('#quizResult').show();
                    $('#loadbar').fadeOut();
                    $('#result-of-question').show();
                    $('#graph-result').show();
                    chartMake();
                }, 1000);
            } else {
                $('#qid').html(questionNo + 1);
                $('input:radio').prop('checked', false);
                setTimeout(function(){
                    $('#quiz').show();
                    $('#loadbar').fadeOut();
                }, 1000);
                $('#question').html(q[questionNo].Q);
                $($('#f-option').parent().find('label')).html(q[questionNo].C[0]);
                $($('#s-option').parent().find('label')).html(q[questionNo].C[1]);
                $($('#t-option').parent().find('label')).html(q[questionNo].C[2]);
            }
        }, 1000);
    });


// chartMake();
    function chartMake(){

         var chart = AmCharts.makeChart("chartdiv",
            {
            "type": "serial",
            "theme": "dark",
            "dataProvider": [{
                "name": "Correct",
                "points": correctCount,
                "color": "#00FF00",
                "bullet": "http://i2.wp.com/img2.wikia.nocookie.net/__cb20131006005440/strategy-empires/images/8/8e/Check_mark_green.png?w=250"
            }, {
                "name": "Incorrect",
                "points":q.length-correctCount,
                "color": "red",
                "bullet": "http://4vector.com/i/free-vector-x-wrong-cross-no-clip-art_103115_X_Wrong_Cross_No_clip_art_medium.png"
            }],
            "valueAxes": [{
                "maximum": q.length,
                "minimum": 0,
                "axisAlpha": 0,
                "dashLength": 4,
                "position": "left"
            }],
            "startDuration": 1,
            "graphs": [{
                "balloonText": "<span style='font-size:13px;'>[[category]]: <b>[[value]]</b></span>",
                "bulletOffset": 10,
                "bulletSize": 52,
                "colorField": "color",
                "cornerRadiusTop": 8,
                "customBulletField": "bullet",
                "fillAlphas": 0.8,
                "lineAlpha": 0,
                "type": "column",
                "valueField": "points"
            }],
            "marginTop": 0,
            "marginRight": 0,
            "marginLeft": 0,
            "marginBottom": 0,
            "autoMargins": false,
            "categoryField": "name",
            "categoryAxis": {
                "axisAlpha": 0,
                "gridAlpha": 0,
                "inside": true,
                "tickLength": 0
            } 
        });
    }
}); 
