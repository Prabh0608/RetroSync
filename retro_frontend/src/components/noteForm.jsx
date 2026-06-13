const Form = ({ handleAddNote, text, setText, placeHolder }) => {
  return (
    <form
      onSubmit={handleAddNote}
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "20px",
      }}
    >
      <input
        type="text"
        placeholder={`${placeHolder}`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "95%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <button
        style={{
          width: "50%",
          padding: "10px",
          margin: "10px",
          border: "1px dashed #cbd5e1",
          borderRadius: "8px",
          background: "white",
          cursor: "pointer",
        }}
      >
        Add
      </button>
    </form>
  );
};
export default Form;
