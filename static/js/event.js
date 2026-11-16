for (let i = 1; i <= 9; i++) {

    let bigGrid = document.getElementById("grid" + i);

    for (let j = 1; j <= 100; j++) {

        let smallGrid = document.createElement("div");

        smallGrid.id = "grid" + i + "_" + j;
        smallGrid.className = "gg";

        bigGrid.appendChild(smallGrid);
    }
}


function virtualInspection(vc) {
    vc.forEach(num => {
        document.getElementById("grid5_" + num).click();
    });
}

document.querySelectorAll("#grid5 .gg").forEach((cell, index) => {

    cell.addEventListener("click", function () {

        if (inspectionEnded || this.dataset.inspected === "true") return;

        this.dataset.inspected = "true";
        clickCount++;

        console.log("Clicked:", this.id);

        if (myphase==3){

            mysample.push({"phase":myphase,"trial":trial3_num,
                "position":index,
                "time_stamp":Date.now()
            });

            this.style.backgroundColor = "#4a90e2";
            this.textContent = "?";
            this.style.color = "black";
            this.style.fontSize = "16px";
            $("#inspectionMessage").text("Select 10 squares you would inspect to evaluate whether the central area is mine-free. You will not see the results of your inspections.");
            if (clickCount === 10) {inspectionEnded = true;$("#btn_next3").prop('disabled', false);}

        }else{


            mysample.push({"phase":myphase,"trial":trial_num,
                "position":index,
                "time_stamp":Date.now()
            });

        if (centerMineArray[index] === 1) {

            this.classList.add("mine-cell");
            inspectionEnded = true;

            $("#inspectionMessage").text(
                "Mine found! Inspection complete. Please make your investment decision below."
            );
            $("#question_ctn").css('display','block');

        } else {

            this.style.backgroundColor = "white";
            

            if (clickCount === 10) {
                inspectionEnded = true;

                $("#inspectionMessage").text(
                    "Inspection complete. Please make your investment decision below."
                );
                $("#question_ctn").css('display','block');

            } else {
                $("#inspectionMessage").text(
                    "No mine found. You can continue inspecting."
                );
            }
        }

        }

        $("#inspectionInfo").text(
            `Inspected: ${clickCount} / 10 squares`
        );

    });

});


$("#clickArea").click(function(e) {
    let track = $("#mytrack");

    let x = e.pageX - track.offset().left;
    let width = track.width();

    x = Math.max(0, Math.min(x, width));

    $("#mythumb").css("left", x + "px");

    sans = Math.round(x / width * 100);

    console.log("Value:", sans);

    clickAns();
});


// $(function () {
//   const $paragraphs = $("#pg_ins").children();
//   let current = 1;

//   // Show the first paragraph initially
//   $paragraphs.hide().eq(0).show();

//   $(document).on("keydown.pg_ins", function (e) {
//     if (e.code !== "Space" || e.repeat) return;

//     e.preventDefault();

//     if (current < $paragraphs.length) {
//       $paragraphs.eq(current).show();
//       current++;
//     } else {
//       // All instructions are visible
//       p2_flag=1;
//       $(document).off("keydown.pg_ins");
//       $('#btn_forward').prop('disabled',false);
//     }
//   });
// });

function showInstructions(pageId) {
    const $page = $("#" + pageId);
    const $paragraphs = $page.children();
    let current = 1;

    $paragraphs.hide().eq(0).show();

    $(document).on("keydown." + pageId, function (e) {
        if (e.code !== "Space" || e.repeat || !$page.is(":visible")) return;

        e.preventDefault();

        if (current < $paragraphs.length) {
            $paragraphs.eq(current).show();
            current++;
        } else {
            $(document).off("keydown." + pageId);
        }
    });
}

$(function () {
    showInstructions("pg_ins");
    showInstructions("pg_ins2");
    showInstructions("pg_ins3");
});

