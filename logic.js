const form = document.querySelector('form');
//Dropdowns
const curveType = document.querySelector('#curve-type');
const designSpeed = document.querySelector('#design-speed');
const finalGrade = document.querySelector('#final-grade');
//Inputs
const initialGrade = document.querySelector('#initial-grade');
const lowPointElevation = document.querySelector('#low-point-elevation');
const lowPointStation = document.querySelector('#low-point-station');
const endOfVerticalCurve = document.querySelector('#end-of-vertical-curve');
//Output Texts
const PVISText = document.querySelector('#pvis-value');
const PVIEText = document.querySelector('#pvie-value');
const KValueText = document.querySelector('#k-value');
const LVCText = document.querySelector('#lvc-value');
const xhlText = document.querySelector('#xhl-value');
const BVCSText = document.querySelector('#bvcs-value');
const BVCEText = document.querySelector('#bvce-value');
const EVCSText = document.querySelector('#evcs-value');
const EVCEText = document.querySelector('#evce-value');
const initialGradeText = document.querySelector('#initial-grade-value');
const finalGradeText = document.querySelector('#final-grade-value');
const gradeChangeText = document.querySelector('#grade-change-value');


form.addEventListener('submit', (event) => {
    event.preventDefault();
    //Dropdown Values
    const curveTypeValue = curveType.value;
    const designSpeedValue = parseFloat(designSpeed.value);
    const finalGradeValue = finalGrade.value;
    //Inputs Values
    const initialGradeValue = parseFloat(initialGrade.value);
    const lowPointElevationValue = parseFloat(lowPointElevation.value);
    const lowPointStationValue = parseFloat(lowPointStation.value);
    const endOfVerticalCurveValue = parseFloat(endOfVerticalCurve.value);

    //For K-Value
    //Whent Crest is selected

    //To print K-Value
    let k;
    if (curveTypeValue == 'Crest') {
        if (designSpeedValue === 15) {
            k = 3;
        } else if (designSpeedValue === 20) {
            k = 7;
        } else if (designSpeedValue === 25) {
            k = 12;
        } else if (designSpeedValue === 30) {
            k = 19;
        } else if (designSpeedValue === 35) {
            k = 29;
        } else if (designSpeedValue === 40) {
            k = 44;
        } else if (designSpeedValue === 45) {
            k = 61;
        } else if (designSpeedValue === 50) {
            k = 84;
        } else if (designSpeedValue === 55) {
            k = 114;
        } else if (designSpeedValue === 60) {
            k = 151;
        } else if (designSpeedValue === 65) {
            k = 193;
        } else if (designSpeedValue === 70) {
            k = 247;
        } else if (designSpeedValue === 75) {
            k = 312;
        } else if (designSpeedValue === 80) {
            k = 384;
        }
        //When Sag is selected    
    } else if (curveTypeValue == 'Sag') {
        if (designSpeedValue === 15) {
            k = 10;
        } else if (designSpeedValue === 20) {
            k = 17;
        } else if (designSpeedValue === 25) {
            k = 26;
        } else if (designSpeedValue === 30) {
            k = 37;
        } else if (designSpeedValue === 35) {
            k = 49;
        } else if (designSpeedValue === 40) {
            k = 64;
        } else if (designSpeedValue === 45) {
            k = 79;
        } else if (designSpeedValue === 50) {
            k = 96;
        } else if (designSpeedValue === 55) {
            k = 115;
        } else if (designSpeedValue === 60) {
            k = 136;
        } else if (designSpeedValue === 65) {
            k = 157;
        } else if (designSpeedValue === 70) {
            k = 181;
        } else if (designSpeedValue === 75) {
            k = 206;
        } else if (designSpeedValue === 80) {
            k = 231;
        }
    }
    KValueText.innerHTML = "<b>K-VALUE:</b>" + " " + k;


    //High Point or Low Point Distanc xhl
    let xhlValue = k * initialGradeValue;
    if (xhlValue < 0) {
        xhlValue = -1 * xhlValue;
    }
    if (curveTypeValue == 'Crest') {
        xhlText.innerHTML = "<b>HIGH POINT DISTANCE:</b>" + " " + xhlValue + " " + "ft";
    } else if (curveTypeValue == 'Sag') {
        xhlText.innerHTML = "<b>LOW POINT DISTANCE:</b>" + " " + xhlValue + " " + "ft";
    }

    //BVC Station 
    let BVCSValue = parseFloat(lowPointStationValue - xhlValue).toFixed(2);
    BVCSText.innerHTML = "<b>BVC STATION: </b>" + BVCSValue + " ft";


    //BVC Elevation
    let y = lowPointElevationValue;
    let a = 1 / (2 * k * 100);
    let BVCEValue = parseFloat(y - (a * xhlValue**2) - (initialGradeValue * xhlValue / 100)).toFixed(2)
    BVCEText.innerHTML = "<b>BVC ELEVATION: </b>" + BVCEValue + " ft";


    //CURVE LENGTH
    let b = initialGradeValue/100;
    let c = BVCEValue - endOfVerticalCurveValue;
    let curveLength1 = parseFloat((-b + Math.sqrt(b**2 - (4*a*c)))/(2*a)).toFixed(2);
    let curveLength2 = parseFloat((-b - Math.sqrt(b**2 - (4*a*c)))/(2*a)).toFixed(2);


    //GRADES
    let gTwoOne = parseFloat((curveLength1 / k) + initialGradeValue).toFixed(2);
    let gTwoTwo = parseFloat((curveLength2 / k) + initialGradeValue).toFixed(2);

    //EVC STATION, GRADE CHANGE, PVI STATION, PVI ELEVATIO, FINAL GRADE
    let EVCSValue1 = parseFloat(curveLength1) + parseFloat(BVCSValue);
    let EVCSValue2 = parseFloat(curveLength2) + parseFloat(BVCSValue);
    let gradeChValue1 = parseFloat(gTwoOne) - parseFloat(initialGradeValue);
    let gradeChValue2 = parseFloat(gTwoTwo) - parseFloat(initialGradeValue);
    let PVISValue1 = parseFloat(curveLength1 / 2) + parseFloat(BVCSValue);
    let PVISValue2 = parseFloat(curveLength2 / 2) + parseFloat(BVCSValue);
    
    let halfLVC1 = curveLength1 / 2;
    let halfLVC2 = curveLength2 / 2;
    let PVIEValue1 = parseFloat((a * halfLVC1**2) + (b * halfLVC1) + parseFloat(BVCEValue) - ((gradeChValue1 * curveLength1) / 800)).toFixed(2);
    let PVIEValue2 = parseFloat((a * halfLVC2**2) + (b * halfLVC2) + parseFloat(BVCEValue) - ((gradeChValue2 * curveLength2) / 800)).toFixed(2);


    if (finalGradeValue == "Positive") {
        if (gTwoOne > 0) {
            EVCSText.innerHTML = "<b>EVC STATION:</b>  " +  EVCSValue1 + " ft";
            EVCEText.innerHTML = "<b>EVC ELEVATION:</b> " + endOfVerticalCurveValue + " ft";
            LVCText.innerHTML = "<b>CURVE LENGTH: </b>" + curveLength1 + " ft";
            finalGradeText.innerHTML = "<b>Final Grade: </b>" + gTwoOne + "%";
            gradeChangeText.innerHTML = "<b>GRADE CHANGE: </b>" + gradeChValue1 + " %";
            PVISText.innerHTML = "<b>PVI STATION: </b>" + PVISValue1 + " ft";
            PVIEText.innerHTML = "<b>PVI ELEVATION: </b>" + PVIEValue1 + " ft";
        } else if (gTwoTwo > 0) {
            EVCStText.innerHTML = "<b>EVC STATION:</b>  " + EVCSValue2 + " ft";
            EVCElText.innerHTML = "<b>EVC ELEVATION:</b> " + endOfVerticalCurveValue + " ft";
            LVCText.innerHTML = "<b>CURVE LENGTH: </b>" + curveLength2 + " ft";
            finalGradeText.innerHTML = "<b>Final Grade: </b>" + gTwoTwo + "%";
            gradeChangeText.innerHTML = "<b>GRADE CHANGE: </b>" + gradeChValue2 + " %";
            PVISText.innerHTML = "<b>PVI STATION: </b>" + PVISValue2 + " ft";
            PVIEText.innerHTML = "<b>PVI ELEVATION: </b>" + PVIEValue2 + " ft";

        }
    } else if (finalGradeValue == "Negative") {
        if (gTwoOne < 0) {
            EVCStText.innerHTML = "<b>EVC STATION:</b>  " + EVCSValue1 + " ft";
            EVCElText.innerHTML = "<b>EVC ELEVATION:</b> " + endOfVerticalCurveValue + " ft";
            LVCText.innerHTML = "<b>CURVE LENGTH: </b>" + curveLength1 + " ft";
            finalGradeText.innerHTML = "<b>Final Grade: </b>" + gTwoOne + "%";
            gradeChangeText.innerHTML = "<b>GRADE CHANGE: </b>" + gradeChValue1 + " %";
            PVISText.innerHTML = "<b>PVI STATION: </b>" + PVISValue1 + " ft";
            PVIEText.innerHTML = "<b>PVI ELEVATION: </b>" + PVIEValue1 + " ft";
        } else if (gTwoTwo < 0) {
            EVCStText.innerHTML = "<b>EVC STATION:</b>   " + EVCSValue2 + " ft";
            EVCElText.innerHTML = "<b>EVC ELEVATION:</b> " + endOfVerticalCurveValue + " ft";
            LVCText.innerHTML = "<b>CURVE LENGTH: </b>" + curveLength2 + " ft";
            finalGradeText.innerHTML = "<b>Final Grade: </b>" + gTwoTwo + " %";
            gradeChangeText.innerHTML = "<b>GRADE CHANGE: </b>" + gradeChValue2 + " %";
            PVISText.innerHTML = "<b>PVI STATION: </b>" + PVISValue2 + " ft";
            PVIEText.innerHTML = "<b>PVI ELEVATION: </b>" + PVIEValue2 + " ft";
        }
    }

    //INITIAL GRADE
    initialGradeText.innerHTML = "<b>INITIAL GRADE: </b>" + initialGradeValue + " %";


    // form.reset();
});

