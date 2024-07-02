import React from "react";

function TitleCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function RowData(props) {
  const renderValue = (value) => {
    return value || value === 0 ? value : "--";
  };

  return (
    <div className="" key={props.id}>
      <div className="card">
        <div className="card-body flex flex-col p-5">
          <div className="flex flex-col-reverse">
            <h2 className="card-title">{TitleCase(props.name)}</h2>
            <div className="text-sm">
              {props.status === "running" ? (
                <span>
                  🟢<span>Running</span>
                </span>
              ) : (
                <span>
                  🔴<span>Offline</span>
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-row">
            <div className="row basis-1/2">
              <div className="col-12">
                <h1 className="field-temp font-bold text-3xl sm:text-5xl">
                  {renderValue(props.temp)}
                  <span className="text-2xl sm:text-3xl">{props.temp ? "°C" : ""}</span>
                </h1>
              </div>
              <div className="col-12">
                <h1 className="field-title">
                  Humidity :{" "}
                  <span className="field-val">{renderValue(props.humidity)}</span>
                  <span className="unit">{props.humidity ? "%" : ""}</span>
                </h1>
              </div>
              <div className="col-12">
                <h1 className="field-title">
                  pH : <span className="field-val">{renderValue(props.pH)}</span>
                </h1>
              </div>
            </div>
            <div className="row basis-1/2">
              <div className="col-12">
                <h1 className="field-title">Elements</h1>
                <h1>
                  <span className="text-xl font-extrabold">N<sub>2</sub> :</span>{" "}
                  {renderValue(props.nitrogen)}
                </h1>
                <h1>
                  <span className="text-xl font-extrabold">P :</span> {renderValue(props.phosporus)}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RowData;
