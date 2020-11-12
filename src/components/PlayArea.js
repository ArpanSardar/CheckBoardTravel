import React from "react";

const unReduce = (accumulator, length) => {
  if (length <= 0) return accumulator;
  return unReduce([parseInt(length), ...accumulator], length - 1);
};

export default function PlayArea({ boxCount, currentBox, handleMove }) {
  const rowCountArray = unReduce([], boxCount);
  const cellIndexArray = unReduce([], boxCount * boxCount);
  var cellIndexForIteration = 0;
  return (
    <div>
      <table className="playArea-table">
        <tbody>
          {rowCountArray.map((count) => (
            <tr key={count}>
              {rowCountArray.map((count) => {
                cellIndexForIteration = cellIndexForIteration + 1;
                return (
                  <td
                    key={count + "col"}
                    className={
                      cellIndexArray[cellIndexForIteration - 1] === currentBox
                        ? "playArea-activeBox"
                        : ""
                    }
                  ></td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
