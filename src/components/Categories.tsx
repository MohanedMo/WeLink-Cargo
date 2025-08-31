"use client"

import { useState, useEffect } from "react"
import { Search, RefreshCw, DollarSign, Edit3, Save, X, Plus } from "lucide-react"

interface Category {
  id: string
  name: string
  description: string
  rateNormal: number
  rateSpecial: number
  currency: string
  active: boolean
  createdAt: string
  updatedAt: string
}

export default function CategoryRatesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [updatingCategories, setUpdatingCategories] = useState<Set<string>>(new Set())
  const [editForm, setEditForm] = useState<Partial<Category>>({})
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    name: "",
    description: "",
    rateNormal: 0,
    rateSpecial: 0,
    currency: "USD",
    active: true,
  })

  useEffect(() => {
    const mockData: Category[] = [
      {
        id: "cat_standard",
        name: "Standard Parking",
        description: "Regular parking spaces for all vehicles",
        rateNormal: 5.0,
        rateSpecial: 8.0,
        currency: "USD",
        active: true,
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-20T14:30:00Z",
      },
      {
        id: "cat_premium",
        name: "Premium Parking",
        description: "Premium spaces with covered parking",
        rateNormal: 8.0,
        rateSpecial: 12.0,
        currency: "USD",
        active: true,
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-18T09:15:00Z",
      },
      {
        id: "cat_vip",
        name: "VIP Parking",
        description: "VIP spaces with valet service",
        rateNormal: 15.0,
        rateSpecial: 20.0,
        currency: "USD",
        active: true,
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-22T16:45:00Z",
      },
      {
        id: "cat_disabled",
        name: "Accessible Parking",
        description: "Accessible parking spaces",
        rateNormal: 3.0,
        rateSpecial: 3.0,
        currency: "USD",
        active: false,
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-19T11:20:00Z",
      },
    ]

    setTimeout(() => {
      setCategories(mockData)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category.id)
    setEditForm(category)
  }

  const cancelEdit = () => {
    setEditingCategory(null)
    setEditForm({})
  }

  const saveCategory = async (categoryId: string) => {
    setUpdatingCategories((prev) => new Set(prev).add(categoryId))

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setCategories((prev) =>
        prev.map((cat) => (cat.id === categoryId ? { ...cat, ...editForm, updatedAt: new Date().toISOString() } : cat)),
      )

      setEditingCategory(null)
      setEditForm({})
    } catch (error) {
      console.error("Failed to update category:", error)
    } finally {
      setUpdatingCategories((prev) => {
        const newSet = new Set(prev)
        newSet.delete(categoryId)
        return newSet
      })
    }
  }

  const addNewCategory = async () => {
    if (!newCategory.name || !newCategory.description) return

    setUpdatingCategories((prev) => new Set(prev).add("new"))

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const category: Category = {
        id: `cat_${Date.now()}`,
        name: newCategory.name!,
        description: newCategory.description!,
        rateNormal: newCategory.rateNormal || 0,
        rateSpecial: newCategory.rateSpecial || 0,
        currency: newCategory.currency || "USD",
        active: newCategory.active || true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      setCategories((prev) => [...prev, category])
      setNewCategory({
        name: "",
        description: "",
        rateNormal: 0,
        rateSpecial: 0,
        currency: "USD",
        active: true,
      })
      setShowAddForm(false)
    } catch (error) {
      console.error("Failed to add category:", error)
    } finally {
      setUpdatingCategories((prev) => {
        const newSet = new Set(prev)
        newSet.delete("new")
        return newSet
      })
    }
  }

  const toggleCategoryStatus = async (categoryId: string, currentStatus: boolean) => {
    setUpdatingCategories((prev) => new Set(prev).add(categoryId))

    try {
      await new Promise((resolve) => setTimeout(resolve, 800))

      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === categoryId ? { ...cat, active: !currentStatus, updatedAt: new Date().toISOString() } : cat,
        ),
      )
    } catch (error) {
      console.error("Failed to toggle category status:", error)
    } finally {
      setUpdatingCategories((prev) => {
        const newSet = new Set(prev)
        newSet.delete(categoryId)
        return newSet
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Category</span>
          </button>
        </div>

        {/* Add New Category Form */}
        {showAddForm && (
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Add New Category</h3>
              <button onClick={() => setShowAddForm(false)} className="p-1 text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category Name</label>
                <input
                  type="text"
                  value={newCategory.name || ""}
                  onChange={(e) => setNewCategory((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter category name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <input
                  type="text"
                  value={newCategory.description || ""}
                  onChange={(e) => setNewCategory((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Normal Rate</label>
                <input
                  type="number"
                  step="0.01"
                  value={newCategory.rateNormal || ""}
                  onChange={(e) =>
                    setNewCategory((prev) => ({ ...prev, rateNormal: Number.parseFloat(e.target.value) || 0 }))
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Special Rate</label>
                <input
                  type="number"
                  step="0.01"
                  value={newCategory.rateSpecial || ""}
                  onChange={(e) =>
                    setNewCategory((prev) => ({ ...prev, rateSpecial: Number.parseFloat(e.target.value) || 0 }))
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addNewCategory}
                disabled={updatingCategories.has("new") || !newCategory.name || !newCategory.description}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                {updatingCategories.has("new") ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                <span>Add Category</span>
              </button>
            </div>
          </div>
        )}

        {/* Categories List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 text-blue-400 animate-spin" />
            <span className="ml-2 text-gray-400">Loading categories...</span>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Normal Rate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Special Rate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredCategories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-750">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-white">{category.name}</div>
                        <div className="text-sm text-gray-400">{category.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingCategory === category.id ? (
                          <input
                            type="number"
                            step="0.01"
                            value={editForm.rateNormal || ""}
                            onChange={(e) =>
                              setEditForm((prev) => ({ ...prev, rateNormal: Number.parseFloat(e.target.value) || 0 }))
                            }
                            className="w-20 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        ) : (
                          <span className="text-sm font-mono text-green-400">${category.rateNormal.toFixed(2)}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingCategory === category.id ? (
                          <input
                            type="number"
                            step="0.01"
                            value={editForm.rateSpecial || ""}
                            onChange={(e) =>
                              setEditForm((prev) => ({ ...prev, rateSpecial: Number.parseFloat(e.target.value) || 0 }))
                            }
                            className="w-20 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        ) : (
                          <span className="text-sm font-mono text-amber-400">${category.rateSpecial.toFixed(2)}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleCategoryStatus(category.id, category.active)}
                          disabled={updatingCategories.has(category.id)}
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full transition-colors ${
                            category.active
                              ? "bg-green-900 text-green-300 hover:bg-green-800"
                              : "bg-red-900 text-red-300 hover:bg-red-800"
                          }`}
                        >
                          {updatingCategories.has(category.id) ? (
                            <RefreshCw className="h-3 w-3 animate-spin" />
                          ) : category.active ? (
                            "ACTIVE"
                          ) : (
                            "INACTIVE"
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {new Date(category.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {editingCategory === category.id ? (
                            <>
                              <button
                                onClick={() => saveCategory(category.id)}
                                disabled={updatingCategories.has(category.id)}
                                className="p-1.5 text-green-400 hover:text-green-300 hover:bg-green-900/20 rounded transition-colors disabled:opacity-50"
                                title="Save changes"
                              >
                                {updatingCategories.has(category.id) ? (
                                  <RefreshCw className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Save className="h-4 w-4" />
                                )}
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="p-1.5 text-gray-400 hover:text-gray-300 hover:bg-gray-700 rounded transition-colors"
                                title="Cancel editing"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handleEditCategory(category)}
                              className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 rounded transition-colors"
                              title="Edit category"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filteredCategories.length === 0 && !loading && (
          <div className="text-center py-12">
            <DollarSign className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No categories found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
