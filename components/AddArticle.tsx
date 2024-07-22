'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";

const AddArticle: React.FC = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [user, setUser] = useState('');
  const [seoTitle, setSeoTitle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const articleData = { title, category, seoKeywords, shortDescription, description, user, seoTitle };
    
    try {
      const response = await fetch('http://localhost:9999/api/v1/admin/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Article successfully submitted:', responseData);
      // Handle success (e.g., display a success message, redirect to another page)
    } catch (error) {
      console.error('Failed to submit article:', error);
      // Handle error (e.g., display an error message)
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white mt-2">
      <h1 className="text-2xl font-bold mb-4">Add Article</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block text-sm text-gray-700">Title</label>
            <Input 
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-xl mt-2 border-gray-400"
              placeholder="Enter Title"
            />
          </div>
          <div>
            <label htmlFor="user" className="block text-sm text-gray-700">User</label>
            <Input
              type="text"
              id="user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="rounded-xl mt-2 border-gray-400"
              placeholder="Enter User"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm text-gray-700">Category</label>
            <Input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl mt-2 border-gray-400"
              placeholder="Enter Category"
            />
          </div>
          <div>
            <label htmlFor="seoTitle" className="block text-sm text-gray-700">SEO Title</label>
            <Input
              type="text"
              id="seoTitle"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              className="rounded-xl mt-2 border-gray-400"
              placeholder="Enter SEO Title"
            />
          </div>
        </div>
        <div>
          <label htmlFor="seoKeywords" className="block text-sm text-gray-700">SEO Keywords</label>
          <Input
            // as="textarea"
            id="seoKeywords"
            value={seoKeywords}
            onChange={(e) => setSeoKeywords(e.target.value)}
            className="rounded-xl mt-2 border-gray-400"
            placeholder="Enter SEO Keywords"
            // rows={3}
          />
        </div>
        <div>
          <label htmlFor="shortDescription" className="block text-sm text-gray-700">Short Description</label>
          <Input
            // as="textarea"
            id="shortDescription"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="rounded-xl mt-2 border-gray-400"
            placeholder="Enter Short Description"
            // rows={3}
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm text-gray-700">Description</label>
          <Input
            // as="textarea"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded-xl mt-2 border-gray-400"
            placeholder="Enter Description"
            // rows={6}
          />
          {/* Add rich text editor here */}
        </div>
        <div>
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddArticle;
