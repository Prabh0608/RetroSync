import "../css/note-form.css";
import "../css/button.css";

const Form = ({ handleAddNote, text, setText, placeHolder }) => {
  return (
    <form onSubmit={handleAddNote} className="note-form">
      <input
        type="text"
        placeholder={`${placeHolder}`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="note-form-input"
      />

      <button className="button button-note-submit">
        Add
      </button>
    </form>
  );
};
export default Form;
