import { useState } from "react";

const Form = () => {
  const [data, setData] = useState({ Name: "", Email: "", Message: "" });

  const handleChange = (event) => {
    const value = event.target.value;
    const Name = event.target.name;
    setData((prevData) => ({
      ...prevData,
      [Name]: value,
    }));
  };
  console.log(data);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formEle = document.querySelector("form");
    const formData = new FormData(formEle);
    console.log(formData);
    const stringed = JSON.stringify(data);
    const parsed = JSON.parse(stringed);

    const url =
      "https://script.google.com/macros/s/AKfycbw1PAt5RFRfi9fd53fJRXXvqVY4YDP0U1AFIqvkzB4_SxvnrRe_6AR0h8pfxjSbuM6u9g/exec";

    try {
      console.log(stringed, parsed, "john");
      const response = await fetch(url, {
        method: "POST",
        body: stringed,
      });

      if (response.ok) {
        // Read the response body as JSON
        const responseData = await response.text();
        console.log("Response JSON:", responseData, response);
      } else {
        console.log("Failed to send data.");
      }
    } catch (error) {
      console.error("Error while sending data:", error);
      // setData({ Name: "", Email: "", Message: "" });
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <span className="heading">Get in touch</span>
        <input
          name="Name"
          placeholder="Name"
          type="text"
          className="input"
          value={data.Name}
          onChange={handleChange}
        />
        <input
          name="Email"
          placeholder="Email"
          id="mail"
          type="email"
          className="input"
          value={data.Email}
          onChange={handleChange}
        />
        <textarea
          name="Message"
          placeholder="Message"
          rows="10"
          cols="30"
          id="message"
          className="textarea"
          value={data.Message}
          onChange={handleChange}
        ></textarea>
        <div className="button-container">
          <button type="submit" className="send-button">
            Send
          </button>
          <div className="reset-button-container">
            <div id="reset-btn" className="reset-button">
              Reset
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
