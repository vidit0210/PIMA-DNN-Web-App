let model;
(async function() {
  model = await tf.loadLayersModel("./tfjs_files/model.json");
  console.log(model);
})();

document.getElementById("submit").onclick = function() {
  handleSubmit();
};

function handleSubmit() {
  console.log("Button Clicked");
  let DiabeticClass = ["DIABETIC", "NORMAL"];
  let Pregnancies = document.querySelector(".Pregnancies").value;
  let Glucose = document.querySelector(".Glucose").value;
  let BloodPressure = document.querySelector(".BloodPressure").value;
  let SkinThickness = document.querySelector(".SkinThickness").value;
  let Insulin = document.querySelector(".Insulin").value;
  let BMI = document.querySelector(".BMI").value;
  let DiabetesPedigreeFunction = document.querySelector(
    ".DiabetesPedigreeFunction"
  ).value;
  let Age = document.querySelector(".Age").value;

  x = tf.tensor2d(
    [
      [
        parseInt(Pregnancies),
        parseInt(Glucose),
        parseInt(BloodPressure),
        parseInt(SkinThickness),
        parseInt(Insulin),
        parseInt(BMI),
        parseInt(DiabetesPedigreeFunction),
        parseInt(Age)
      ]
    ],
    [1, 8]
  );

  const prediction = model.predict(x);
  console.log(prediction.print());
  let final_res = prediction.dataSync();
  const arr = Array.from(final_res);
  let ans = arr[0];
  console.log(ans);
  let string_result = ans > 0.5 ? "DIABETIC" : "NORMAL";

  console.log(final_res);
  document.getElementById("result").textContent =
    "Your Test Result is  : " + string_result;
}
