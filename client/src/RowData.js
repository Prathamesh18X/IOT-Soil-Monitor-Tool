import React from "react";

function TitleCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function RowData(props) {
  return (
    <div className="" key={props.id}>
      <div className="card">
        <div className="card-body flex flex-col p-5">
          <h2 className="card-title font-extrabold">{TitleCase(props.name)}</h2>
          <div className="flex flex-row">
            <div className="row basis-1/2">
              <div className="col-12">
                <h1 className="field-temp font-bold text-5xl">
                  {props.temp}
                  <span className="text-3xl">
                    {props.temp ? "\u2109" : ""}
                  </span>
                </h1>
              </div>
              <div className="col-12">
                <h1 className="field-title">
                  Humidity :{" "}
                  <span className="field-val">
                    {props.humidity}
                    <span className="unit">{props.humidity ? "%" : ""}</span>
                  </span>
                </h1>
              </div>
              <div className="col-12">
                <h1 className="field-title">
                  pH : <span className="field-val ">{props.pH}</span>
                </h1>
              </div>
            </div>
            <div className="row basis-1/2">
              <div className="col-12">
                <h1 className="field-title">Elements</h1>
                <h1><span className="text-xl font-extrabold">N<sub>2</sub> : </span>{props.nitrogen}</h1>
                <h1><span className="text-xl font-extrabold">P : </span>{props.phosporus}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RowData;
