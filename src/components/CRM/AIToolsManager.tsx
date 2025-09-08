import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, Star, ExternalLink, Zap } from 'lucide-react';

const AIToolsManager = () => {
  const [tools, setTools] = useState([
    {
      id: 1,
      name: 'ChatGPT Plus',
      category: 'AI Writing',
      description: 'Advanced AI assistant for content creation, coding, and problem-solving',
      urduDescription: 'کنٹینٹ بنانے، کوڈنگ اور مسائل حل کرنے کے لیے بہترین AI اسسٹنٹ',
      rating: 4.9,
      users: '100M+',
      price: '$20/month',
      website: 'https://chat.openai.com',
      status: 'Active',
      featured: true,
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300',
      features: ['Text Generation', 'Code Assistant', 'Language Translation'],
      addedDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Midjourney',
      category: 'AI Art',
      description: 'Create stunning AI-generated images and artwork from text prompts',
      urduDescription: 'ٹیکسٹ سے خوبصورت AI امیجز اور آرٹ ورک بنائیں',
      rating: 4.8,
      users: '15M+',
      price: '$10/month',
      website: 'https://midjourney.com',
      status: 'Active',
      featured: true,
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=300',
      features: ['Image Generation', 'Artistic Styles', 'High Resolution'],
      addedDate: '2024-01-12'
    },
    {
      id: 3,
      name: 'Notion AI',
      category: 'Productivity',
      description: 'Intelligent workspace for notes, docs, and project management',
      urduDescription: 'نوٹس، دستاویزات اور پروجیکٹ منیجمنٹ کے لیے ذہین workspace',
      rating: 4.7,
      users: '30M+',
      price: '$8/month',
      website: 'https://notion.so',
      status: 'Pending Review',
      featured: false,
      image: 'https://images.pexels.com/photos/5474030/pexels-photo-5474030.jpeg?auto=compress&cs=tinysrgb&w=300',
      features: ['Smart Notes', 'Team Collaboration', 'AI Writing'],
      addedDate: '2024-01-10'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const categories = ['AI Writing', 'AI Art', 'Productivity', 'Business', 'Development', 'Marketing'];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || tool.category === filterCategory;
    const matchesStatus = filterStatus === 'All' || tool.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const AddToolModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Add New AI Tool</h3>
        
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tool Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter tool name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description (English)</label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Tool description in English"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description (Urdu)</label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="ٹول کی تفصیل اردو میں"
              ></textarea>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="$20/month"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Users</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="100M+"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="4.9"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                <option value="Active">Active</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
              <input
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="https://example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Features (comma separated)</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Text Generation, Code Assistant, Language Translation"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
              <span className="ml-2 text-sm text-gray-700">Featured Tool</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
              <span className="ml-2 text-sm text-gray-700">Editor's Choice</span>
            </label>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              Add Tool
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Tools Management</h2>
          <p className="text-gray-600">Manage your AI tools directory and reviews</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Tool
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search AI tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="All">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <div key={tool.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="relative">
              <img
                src={tool.image}
                alt={tool.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                {tool.featured && (
                  <span className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </span>
                )}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  tool.status === 'Active' ? 'bg-green-100 text-green-800' :
                  tool.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {tool.status}
                </span>
              </div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                <div className="flex items-center text-sm">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-semibold">{tool.rating}</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-emerald-600 font-medium">{tool.category}</span>
                <span className="text-sm text-gray-500 flex items-center">
                  <Zap className="w-4 h-4 mr-1" />
                  {tool.users}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.name}</h3>
              
              <p className="text-gray-600 mb-2 text-sm leading-relaxed line-clamp-2">
                {tool.description}
              </p>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed text-right line-clamp-1">
                {tool.urduDescription}
              </p>

              {/* Features */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {tool.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price and Actions */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-bold text-gray-900">{tool.price}</div>
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-700 flex items-center text-sm"
                >
                  Visit <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Added {new Date(tool.addedDate).toLocaleDateString()}
                </span>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Tool Modal */}
      {showAddModal && <AddToolModal />}
    </div>
  );
};

export default AIToolsManager;