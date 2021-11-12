import { Range, getTrackBackground } from "react-range";

const STEP = 1;

const RangePrice = ({ values, setValues, MIN, MAX }) => {
  // const [values, setValues] = useState([MIN, MAX]);
  return (
    <>
      <div>
        <Range
          values={values}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={(values) => {
            setValues(values);
          }}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "100%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "250px",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values,
                    colors: ["#ccc", "#3cb1ba", "#ccc"],
                    min: MIN,
                    max: MAX,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "25px",
                width: "25px",
                borderRadius: "4px",
                backgroundColor: "#FFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #AAA",
              }}
            >
              <div
                style={{
                  height: "16px",
                  width: "5px",
                  backgroundColor: isDragged ? "#3cb1ba" : "#CCC",
                }}
              />
            </div>
          )}
        />
        <output style={{ marginTop: "30px" }} id='output'>
          {values[0].toFixed(0)} € - {values[1].toFixed(0)} €
        </output>
      </div>
    </>
  );
};

export default RangePrice;
