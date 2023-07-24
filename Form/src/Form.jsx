import { useState } from "react";

const Form = () => {
  const [data, setData] = useState({ Name: "", Email: "", Message: "" });

  const handleChange = (event) => {
    const value = event.target.value;
    const placeHolder = event.target.placeholder;
    setData((prevData) => ({
      ...prevData,
      [placeHolder]: value,
    }));
  };
  console.log(data);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submitted");

    const url =
      "https://script.google.com/macros/s/AKfycbyqra4o2VMftEtITV9Tf8wPvCM02vL_HC6mOJhkOc__1MlMzeiYGM3qR88xX7Hijw0YuQ/exec";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the appropriate content type
        },
        body: JSON.stringify(data), // Convert the data object to JSON before sending
      });

      // Check if the request was successful (status code 200-299)
      if (response.ok) {
        console.log("Data sent successfully!");
      } else {
        console.log("Failed to send data.");
      }
    } catch (error) {
      console.error("Error while sending data:", error);
      setData({ Name: "", Email: "", Message: "" });
    }
  };
  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <span className="heading">Get in touch</span>
        <input
          placeholder="Name"
          type="text"
          className="input"
          value={data.Name}
          onChange={handleChange}
        />
        <input
          placeholder="Email"
          id="mail"
          type="email"
          className="input"
          value={data.Email}
          onChange={handleChange}
        />
        <textarea
          placeholder="Message"
          rows="10"
          cols="30"
          id="message"
          name="message"
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
