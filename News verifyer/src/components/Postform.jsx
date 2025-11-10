import React, { useState } from 'react';

function Postform() {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    media: null,
  });

  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'media') {
      setFormData({ ...formData, media: files[0] });
    } else {
      if (name === 'description' && value.length <= 300) {
        setCharCount(value.length);
        setFormData({ ...formData, [name]: value });
      } else if (name !== 'description') {
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('News submitted successfully!');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-300 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">
          📰 Post Your News
        </h2>

        {/* Subject Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Subject</label>
          <input
            type="text"
            name="subject"
            placeholder="Enter news subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Description (max 300 chars)
          </label>
          <textarea
            name="description"
            placeholder="Write about the news..."
            value={formData.description}
            onChange={handleChange}
            rows="5"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            required
          ></textarea>
          <p className="text-right text-sm text-gray-500">
            {charCount}/300
          </p>
        </div>

        {/* Media Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Attach Media</label>
          <input
            type="file"
            name="media"
            accept="image/*,video/*"
            onChange={handleChange}
            className="w-full text-gray-700"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200"
        >
          Submit News
        </button>
      </form>
    </div>
  );
}

export default Postform;
