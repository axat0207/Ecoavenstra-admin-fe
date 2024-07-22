'use client';
import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import { FaFileExcel, FaEye, FaPrint, FaPlusCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface Article {
  id: number;
  title: string;
  user: string;
  category: string;
  createdAt: string;
  description: string;
}

const Table: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [data, setData] = useState<Article[]>([]);
  const [filteredData, setFilteredData] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [visibleDropdown, setVisibleDropdown] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9999/api/v1/admin/articles');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        // Ensure the result is an array
        if (Array.isArray(result.articles)) {
          setData(result.articles);
          setFilteredData(result.articles);
        } else {
          console.error('Fetched data is not an array:', result);
          setData([]);
          setFilteredData([]);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setData([]);
        setFilteredData([]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setVisibleDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const filtered = data.filter((item) => {
      const title = item.title?.toLowerCase() ?? '';
      const user = item.user?.toLowerCase() ?? '';
      const category = item.category?.toLowerCase() ?? '';
      const createdAt = item.createdAt?.toLowerCase() ?? '';

      return (
        title.includes(searchTerm.toLowerCase()) ||
        user.includes(searchTerm.toLowerCase()) ||
        category.includes(searchTerm.toLowerCase()) ||
        createdAt.includes(searchTerm.toLowerCase())
      );
    });

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, data]);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = Array.isArray(filteredData) ? filteredData.slice(indexOfFirstEntry, indexOfLastEntry) : [];
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleEntriesChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setEntriesPerPage(Number(event.target.value));
  };

  const truncateDescription = (description: string) => {
    // const words = description.split(' ');
    // return words.length > 10 ? words.slice(0, 10).join(' ') + ' ......' : description;
    return description;
  };

  const toggleDropdown = (id: number) => {
    setVisibleDropdown(visibleDropdown === id ? null : id);
  };



  const handleShow = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:9999/api/v1/admin/articles/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const article = await response.json();
      setSelectedArticle(article?.article);
      setShowModal(true);
    } catch (error) {
      console.error('Failed to fetch article:', error);
    }
  };

  const handleEdit = (article: Article) => {
    setSelectedArticle(article);
    setEditModal(true);
  };

  const handleDelete = async () => {
    if (selectedArticle) {
      try {
        const response = await fetch(`http://localhost:9999/api/v1/admin/articles/${selectedArticle.id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setData(data.filter((article) => article.id !== selectedArticle.id));
        setFilteredData(filteredData.filter((article) => article.id !== selectedArticle.id));
        setDeleteModal(false);
        setSelectedArticle(null);
      } catch (error) {
        console.error('Failed to delete article:', error);
      }
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Article</h1>
        <button onClick={() => router.push('/manage/article/add-article')} className="text-blue-600 flex items-center">
          <FaPlusCircle className="mr-2" />
          Add New
        </button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="entries" className="text-sm text-gray-700">
            Show
          </label>
          <select
            id="entries"
            className="p-2 border rounded text-sm"
            value={entriesPerPage}
            onChange={handleEntriesChange}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-gray-700">entries</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="bg-green-500 text-white px-4 py-2 rounded flex items-center">
            <FaFileExcel className="mr-2" />
            Excel
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded flex items-center">
            <FaEye className="mr-2" />
            Column visibility
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
            <FaPrint className="mr-2" />
            Print
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          className="p-2 border rounded text-sm w-full"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2">#</th>
              <th className="border-b p-2">Actions</th>
              <th className="border-b p-2">Title</th>
              <th className="border-b p-2">Creator</th>
              <th className="border-b p-2">Category</th>
              <th className="border-b p-2">Description</th>
              <th className="border-b p-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((item, index) => (
              <tr key={item.id}>
                <td className="border-b p-2">{indexOfFirstEntry + index + 1}</td>
                <td className="border-b p-2 relative">
                  <button
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded"
                    onClick={() => toggleDropdown(item.id)}
                  >
                    Action
                  </button>
                  {visibleDropdown === item.id && (
                    <div ref={dropdownRef} className="absolute z-10 bg-white border rounded shadow-md mt-1">
                      <button
                        className="block hover:bg-gray-200 w-full text-left px-4 py-2 text-sm"
                        onClick={() => handleShow(item.id)}
                      >
                        Show
                      </button>
                      <button
                        className="block hover:bg-gray-200 w-full text-left px-4 py-2 text-sm"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="block hover:bg-gray-200 w-full text-left px-4 py-2 text-sm"
                        onClick={() => {
                          setSelectedArticle(item);
                          setDeleteModal(true);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
                <td className="border-b p-2">{item.title}</td>
                <td className="border-b p-2">{item.user}</td>
                <td className="border-b p-2">{item.category}</td>
                <td className="border-b p-2">{truncateDescription(item.description)}</td>
                <td className="border-b p-2">{formatDate(item.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-700">
          Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, filteredData.length)} of {filteredData.length} entries
        </p>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 ${currentPage === 1 ? 'text-gray-300 bg-gray-100' : 'text-gray-600 bg-gray-200'} rounded`}
          >
            Previous
          </button>
          {Array.from({ length: Math.ceil(filteredData.length / entriesPerPage) }, (_, number) => (
            <button
              key={number + 1}
              onClick={() => handlePageChange(number + 1)}
              className={`px-4 py-2 ${currentPage === number + 1 ? 'text-white bg-blue-500' : 'text-gray-600 bg-gray-200'} rounded`}
            >
              {number + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredData.length / entriesPerPage)}
            className={`px-4 py-2 ${currentPage === Math.ceil(filteredData.length / entriesPerPage) ? 'text-gray-300 bg-gray-100' : 'text-gray-600 bg-gray-200'} rounded`}
          >
            Next
          </button>
        </div>
      </div>

      {showModal && selectedArticle && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 md:p-8 lg:p-10 rounded-lg shadow-2xl max-w-3xl w-full">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Article Details</h2>
      <div className="space-y-4">
        <p className="text-lg"><strong>Title:</strong> {selectedArticle.title}</p>
        <p className="text-lg"><strong>User:</strong> {selectedArticle.user}</p>
        <p className="text-lg"><strong>Category:</strong> {selectedArticle.category}</p>
        <p className="text-lg"><strong>Description:</strong> {selectedArticle.description}</p>
        <p className="text-lg"><strong>Created At:</strong> {formatDate(selectedArticle.createdAt)}</p>
      </div>
      <div className="mt-8 flex justify-end">
        <button
          onClick={() => setShowModal(false)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg focus:outline-none transition duration-300 ease-in-out"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

{editModal && selectedArticle && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 md:p-8 lg:p-10 rounded-lg shadow-2xl max-w-3xl w-full">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Edit Article</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          // Perform the edit operation
          try {
            const response = await fetch(`http://localhost:9999/api/v1/admin/articles/${selectedArticle.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(selectedArticle),
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const updatedArticle = await response.json();
            setData(data.map((article) => (article.id === selectedArticle.id ? updatedArticle : article)));
            setFilteredData(filteredData.map((article) => (article.id === selectedArticle.id ? updatedArticle : article)));
            setEditModal(false);
            setSelectedArticle(null);
          } catch (error) {
            console.error('Failed to update article:', error);
          }
        }}
      >
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={selectedArticle.title}
            onChange={(e) => setSelectedArticle({ ...selectedArticle, title: e.target.value })}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            id="category"
            type="text"
            value={selectedArticle.category}
            onChange={(e) => setSelectedArticle({ ...selectedArticle, category: e.target.value })}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={selectedArticle.description}
            onChange={(e) => setSelectedArticle({ ...selectedArticle, description: e.target.value })}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg focus:outline-none transition duration-300 ease-in-out">
            Save Changes
          </button>
          <button onClick={() => setEditModal(false)} className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg focus:outline-none transition duration-300 ease-in-out">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}

{deleteModal && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 md:p-8 lg:p-10 rounded-lg shadow-2xl max-w-lg w-full">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Confirm Delete</h2>
      <p className="text-lg mb-8">Are you sure you want to delete this article?</p>
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg focus:outline-none transition duration-300 ease-in-out"
        >
          Yes, Delete
        </button>
        <button
          onClick={() => setDeleteModal(false)}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg focus:outline-none transition duration-300 ease-in-out"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Table;