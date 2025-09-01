import { useEffect, useState } from "react";
import { RefreshCw, DollarSign, Edit3, Save, X } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

import { adminApis } from "../services/Apis/admin/admin.api";
import { useCategoriesData } from "../store/admin";
import { connectWS } from "../services/ws";
import type {
  Category,
  EditCategoryBody,
} from "../services/Apis/admin/admin.types";

export default function Categories() {
  const staticCategory = {
    id: "",
    rateNormal: 0,
    rateSpecial: 0,
  };
  const [editForm, setEditForm] = useState<EditCategoryBody>(staticCategory);
  const [saveLoading, setSaveLoading] = useState(false);
  const { categoriesData, setCategoriesData } = useCategoriesData();

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => adminApis.categories(),
  });

  const mutation = useMutation({
    mutationKey: ["edit-category"],
    mutationFn: (body: EditCategoryBody) => adminApis.editCategory(body),
    onSuccess: () => {
      Swal.fire({
        title: "Success",
        text: "Category is updated !",
        icon: "success",
        confirmButtonText: "Ok",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Error",
        text: "Category not updated !",
        icon: "error",
        confirmButtonText: "Ok",
      });
    },
  });

  useEffect(() => {
    setCategoriesData(categories);
    connectWS();
  }, [categories]);

  const saveCategory = () => {
    try {
      setSaveLoading(true);
      mutation.mutate(editForm);
      setEditForm(staticCategory);
      setSaveLoading(false);
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 max-w-7xl">
        {isLoading ? (
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
                      #ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Normal Rate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Special Rate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {categoriesData?.map((category: Category) => (
                    <tr key={category.id} className="hover:bg-gray-750">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-white">
                          {category.id}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-white">
                          {category.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap ">
                        {editForm.id === category.id ? (
                          <input
                            type="number"
                            value={editForm.rateNormal || ""}
                            onChange={(e) =>
                              setEditForm((prev) => ({
                                ...prev,
                                rateNormal: Number(e.target.value),
                              }))
                            }
                            className="w-20 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        ) : (
                          <span className="text-sm  font-mono text-green-400">
                            ${category.rateNormal}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editForm.id === category.id ? (
                          <input
                            type="number"
                            value={editForm.rateSpecial || ""}
                            onChange={(e) =>
                              setEditForm((prev) => ({
                                ...prev,
                                rateSpecial: Number(e.target.value),
                              }))
                            }
                            className="w-20 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        ) : (
                          <span className="text-sm font-mono text-amber-400">
                            ${category.rateSpecial}
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {editForm.id === category.id ? (
                            <>
                              <button
                                onClick={() => saveCategory()}
                                className="p-1.5 text-green-400 cursor-pointer hover:text-green-300 hover:bg-green-900/20 rounded transition-colors disabled:opacity-50"
                                title="Save changes"
                              >
                                {saveLoading ? (
                                  <RefreshCw className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Save className="h-4 w-4" />
                                )}
                              </button>
                              <button
                                onClick={() => setEditForm(staticCategory)}
                                className="p-1.5 text-gray-400 hover:text-gray-300 hover:bg-gray-700 rounded transition-colors"
                                title="Cancel editing"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => setEditForm(category)}
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

        {categoriesData?.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <DollarSign className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">
              No categories found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
