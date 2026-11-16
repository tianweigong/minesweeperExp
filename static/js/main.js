//default
const exp_id="sweep";
var comprehension_count=0;
var trial_start_time;
var ans_start_time;
var finish_mod=0;
var mydata=new Array;
var mysample=new Array;
const myID=Math.random().toString(35).substring(2, 11)

var trial_num=-1;
var trial2_num=-1;
var trial3_num=-1;
var myphase=0;

const exp_start_time=Date.now();

// const trial_total=10;
// const trial_list=shuffle([0, 0, 0, 0, 0, 1, 1, 1, 1, 1])

const trial_total=10;
const trial_list=shuffle([0, 0, 0, 0, 0, 1, 1, 1, 1, 1])

const trial2_total=20;
const trial2_list=shuffle(Array.from({ length: trial2_total}, (_, i) => i))

const trial3_total=8;
const trial3_list=shuffle(Array.from({ length: trial3_total }, (_, i) => i))

var sans=0;

var mineArray = [];
var centerMineArray = [];
var clickCount = 0;
var inspectionEnded = false;


function idpro_show() {
	$('#pg_cons').css('display','none')
	$('#pg_idpro').css('display','block')
	window.scrollTo(0,0)
}

function idpro_check(){
	if(document.getElementById("idpro").value==""){
		$('#btn_idpro').prop('disabled',true)
	}else{
	 $('#btn_idpro').prop('disabled',false)
	}
}

function ins_show() {
	$('#pg_idpro').css('display','none')
	$('#pg_ins').css('display','block')
	window.scrollTo(0,0)
}

function click_comprehension(){

	var check_flag1= document.getElementById("check1_yes").checked || document.getElementById("check1_no").checked
	var check_flag2= document.getElementById("check2_yes").checked || document.getElementById("check2_no").checked
	var check_flag3= document.getElementById("check3_yes").checked || document.getElementById("check3_no").checked
	var check_flag4= document.getElementById("check4_yes").checked || document.getElementById("check4_no").checked


	if (check_flag1&check_flag2&check_flag3&check_flag4){
		comprehension_check()
	}
}

function comprehension_check(){
	comprehension_count++;
	var check_ans=[]

	var p=document.getElementById("check1_yes").checked

	p=p*document.getElementById("check2_yes").checked
	p=p*document.getElementById("check3_yes").checked
	p=p*document.getElementById("check4_yes").checked

	if (p){
		$('#pg_nice').css('display','block')
		$('#pg_again').css('display','none')
	}else{
		$('#pg_again').css('display','block')
	}
}

function ins_next(){
	$('#pg_ins').css('display','none')
	$('#pg_ins2').css('display','none')
	$('#pg_ins3').css('display','none')
	$('#pg_game').css('display','block')
	myphase++;
	window.scrollTo(0,0)

	my_trial()
}


function my_trial(){

	if (myphase==2){my_trial2();return;}
	if (myphase==3){my_trial3();return;}

	if (trial_num!=-1){
		mydata.push({"phase":myphase,
			"trial":trial_num,
			"type":trial_list[trial_num],
			"answer":sans,
			"centerMineArray":centerMineArray.flatMap((v, i) => v ? [i] : []),
			"mineArray":mineArray.flatMap((v, i) => v ? [i] : []),
			"trial_start_time":trial_start_time,
			"trial_end_time":Date.now()
		});
	}

	if (trial_num>=(trial_total-1)){
		$("#pg_game").css('display','none');
		$("#pg_ins2").css('display','block');
		return;
	}

	trial_num++;

	$("#mythumb").css('display','none');

	$("#question_ctn").css('display','none');

  	trial_start_time=Date.now()


  	mineArray = [];
	centerMineArray = [];
	clickCount = 0;
	inspectionEnded = false;

	mineDisplay();

	if (trial_list[trial_num]==0){centerMineArray=[];}

	document.querySelectorAll("#grid5 .gg").forEach(cell => {
		    cell.dataset.inspected = "false";
		    cell.classList.remove("mine-cell");
		    cell.style.backgroundColor = "";});

	$("#inspectionInfo").text(`Inspected: 0 / 10 squares`);
}

function btn_next_click() {
	$("#btn_next").prop('disabled', true);
	window.scrollTo(0,0);
	my_trial();
}


function clickAns(){
	$("#mythumb").css('display','block');
	$("#btn_next").prop('disabled', false);
}



function my_trial2(){

	if (trial2_num!=-1){
		mydata.push({"phase":myphase,
			"trial":trial2_num,
			"type": VirtualNames[trial2_list[trial2_num]],
			"VirClick":VirtualClicks[trial2_list[trial2_num]],
			"answer":sans,
			"centerMineArray":centerMineArray.flatMap((v, i) => v ? [i] : []),
			"mineArray":mineArray.flatMap((v, i) => v ? [i] : []),
			"trial_start_time":trial_start_time,
			"trial_end_time":Date.now()
		});
	}

	if (trial2_num>=(trial2_total-1)){
		$("#pg_game").css('display','none');
		$("#pg_ins3").css('display','block');
		return;
	}

	trial2_num++;

	$("#mythumb").css('display','none');
	$("#question_ctn").css('display','none');

  	trial_start_time=Date.now()

  	mineArray = [];
	centerMineArray = [];
	clickCount = 0;
	inspectionEnded = false;

	mineDisplay();

	centerMineArray=[];

	document.querySelectorAll("#grid5 .gg").forEach(cell => {
		    cell.dataset.inspected = "false";
		    cell.classList.remove("mine-cell");
		    cell.style.backgroundColor = "";});
	$("#inspectionInfo").text(`Inspected: 0 / 10 squares`);

	virtualInspection(VirtualClicks[trial2_list[trial2_num]]);
}


function my_trial3(){
	$("#next_ctn").css('display', "block");
	$("#btn_next3").prop('disabled', true);

	if (trial3_num!=-1){
		mydata.push({"phase":myphase,
			"trial":trial3_num,
			"type":trial3_list[trial3_num],
			"answer":1,
			"centerMineArray":centerMineArray.flatMap((v, i) => v ? [i] : []),
			"mineArray":mineArray.flatMap((v, i) => v ? [i] : []),
			"trial_start_time":trial_start_time,
			"trial_end_time":Date.now()
		});
	}

	if (trial3_num>=(trial3_total-1)){
		$("#pg_game").css('display','none');
		$("#pg_ques").css('display','block');
		return;
	}

	trial3_num++;

	$("#mythumb").css('display','none');

	$("#question_ctn").css('display','none');

  	trial_start_time=Date.now()


  	mineArray = [];
	clickCount = 0;
	inspectionEnded = false;

	mineDisplay();

	centerMineArray=[];

	document.querySelectorAll("#grid5 .gg").forEach(cell => {
	    cell.dataset.inspected = "false";
	    cell.classList.remove("mine-cell");
	    cell.style.backgroundColor = "";
	    cell.textContent = "";
	});

	$("#inspectionInfo").text(`Inspected: 0 / 10 squares`);
}


function task_bye(){
	if (finish_mod==0){
		$("#pg_ques").css('display', 'none');
		$("#pg_bye").css('display', 'block');
		finish_mod=1
		SaveData(1)
	}
}


function survey_check(){
	if (document.getElementById("gender_unselected").selected||document.getElementById("age").value==""){
	}else{
		$('#btn_finish').prop('disabled', false)
	}
}


const supabaseUrl =
  'https://lcccewfgocwohvqzqepa.supabase.co';

const supabaseKey =
  'sb_publishable_MwdKJu0wQlRsM5jVTrPYRw_fe4etYLR';

const supabaseClient =
  supabase.createClient(
    supabaseUrl,
    supabaseKey
  );

async function SaveData(dbs){

	var feedback=document.getElementById("text_feedback").value;
	feedback=feedback.replace(/'/g,"\\'");
	feedback=feedback.replace(/"/g, '\\"');

	var age=document.getElementById("age").value;
	var e = document.getElementById("gender");
	var gender=e.options[e.selectedIndex].value;
	var idpro=document.getElementById("idpro").value;

	const exp_end_time=Date.now()

	if(dbs==0){
		var a = document.createElement("a");
		var file = new Blob([JSON.stringify(
			{exp:exp_id,
			participant_id:idpro+"_"+myID+ "_" +comprehension_count+"_"+exp_start_time+"_"+exp_end_time,
			age:age,
			gender:gender,
			feedback:feedback,
			data:JSON.stringify(mydata),
			sample:JSON.stringify(mysample)
		}
			)], 
			{type: "application/json"});
		a.href = URL.createObjectURL(file);
		a.download = 'myexpdata.json';
		a.click();
		return;
	}


	const result = await supabaseClient
    .from('experiment_data')
    .insert([
        {
            exp: exp_id,
            participant_id:
                idpro + "_" +
                myID + "_" +
                comprehension_count + "_" +
                exp_start_time + "_" +
                exp_end_time,

            age: age,
            gender: gender,
            feedback: feedback,

            data: mydata,
            sample: mysample,

            user_agent: navigator.userAgent,

            screen_width: window.innerWidth,
            screen_height: window.innerHeight,

            timezone:
                Intl.DateTimeFormat()
                    .resolvedOptions()
                    .timeZone,

            language: navigator.language
        }
    ]);

if(result.error){
    console.error(result.error);
    $('#pg_upload').css('display','block');
    setTimeout(() => $('#btn_upload').prop('disabled', false), 10000);

}else{
    $('#pg_bye_good').css('display','block');
}


}

function finish_upload () {
	$('#pg_upload').css('display','none');
	$('#well_done').html("");
	$('#pg_bye_good').css('display','block');
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}


function mineDisplay(){

    for (let i = 0; i < 800; i++) {
        mineArray.push(Math.random() < 0.2 ? 1 : 0);
    }

    for (let i = 0; i < 100; i++) {
        centerMineArray.push(Math.random() < 0.2 ? 1 : 0);
    }

    let index=0;

    for (let i = 1; i <= 9; i++) {

        if (i === 5) continue;

        for (let j = 1; j <= 100; j++) {

            let cell = document.getElementById("grid" + i + "_" + j);

            let mine = mineArray[index];

            cell.dataset.mine = mine;

            if (mine === 1) {
                cell.classList.add("mine-cell");
            } else {
                cell.classList.remove("mine-cell");
            }

            index++;
        }
    }

}
