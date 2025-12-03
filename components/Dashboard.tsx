import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { SupabaseCar } from '../types';
import { Plus, Edit, Trash2, X, Image as ImageIcon, Loader2, ArrowLeft } from 'lucide-react';

export default function Dashboard() {
  const [cars, setCars] = useState<SupabaseCar[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Partial<SupabaseCar>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  async function fetchCars() {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) {
      console.error('Error fetching cars:', error);
      alert('Error fetching cars');
    } else if (data) {
      setCars(data);
    }
    setIsLoading(false);
  }

  function handleEdit(car: SupabaseCar) {
    setEditingCar(car);
    setImageFile(null);
    setIsModalOpen(true);
  }

  function handleCreate() {
    setEditingCar({
      is_available: true,
      price_per_day: 0,
      fuel_type: 'Diesel',
      gearbox: 'Manuelle',
      category: 'Berline'
    });
    setImageFile(null);
    setIsModalOpen(true);
  }

  async function handleDelete(id: number) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) return;

    try {
      const { error } = await supabase.from('cars').delete().eq('id', id);
      if (error) throw error;
      fetchCars();
    } catch (error) {
      alert('Erreur lors de la suppression');
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      let imageUrl = editingCar.image_url;
      
      // --- IMAGE UPLOAD LOGIC START ---
      if (imageFile) {
        // 1. Upload to Supabase Storage
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('car-images')
          .upload(fileName, imageFile);
        
        if (uploadError) throw uploadError;
        
        // 2. Get the Public URL
        const { data: { publicUrl } } = supabase.storage
          .from('car-images')
          .getPublicUrl(fileName);
          
        imageUrl = publicUrl;
      }
      // --- IMAGE UPLOAD LOGIC END ---

      const carData = {
        name: editingCar.name,
        brand: editingCar.brand,
        price_per_day: editingCar.price_per_day,
        promo_price: editingCar.promo_price || null,
        fuel_type: editingCar.fuel_type,
        gearbox: editingCar.gearbox,
        category: editingCar.category,
        description: editingCar.description,
        is_available: editingCar.is_available,
        image_url: imageUrl
      };

      if (editingCar.id) {
        // Update existing car
        const { error } = await supabase
          .from('cars')
          .update(carData)
          .eq('id', editingCar.id);
        
        if (error) throw error;
      } else {
        // Insert new car
        const { error } = await supabase
          .from('cars')
          .insert([carData]);
        
        if (error) throw error;
      }

      setIsModalOpen(false);
      fetchCars();
    } catch (error: any) {
      console.error('Error saving:', error);
      alert('Erreur lors de la sauvegarde: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                 <ArrowLeft size={20} />
             </a>
             <h1 className="text-2xl font-serif font-bold text-gray-900">Trevi Dashboard</h1>
          </div>
          <button 
            onClick={handleCreate}
            className="bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium"
          >
            <Plus size={18} /> Ajouter un véhicule
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-gold-600" size={40} />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Modèle</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Catégorie</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Prix/J</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">État</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {cars.map((car) => (
                    <tr key={car.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="w-16 h-12 rounded bg-gray-200 overflow-hidden relative">
                           {car.image_url ? (
                               <img src={car.image_url} alt={car.name} className="w-full h-full object-cover" />
                           ) : (
                               <div className="w-full h-full flex items-center justify-center text-gray-400">
                                   <ImageIcon size={16} />
                               </div>
                           )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{car.brand} {car.name}</div>
                        <div className="text-xs text-gray-500">{car.fuel_type} • {car.gearbox}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{car.category}</td>
                      <td className="px-6 py-4">
                        <div className="font-bold">{car.price_per_day} MAD</div>
                        {car.promo_price && (
                            <div className="text-xs text-red-500 font-medium">Promo: {car.promo_price}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${car.is_available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {car.is_available ? 'Disponible' : 'Indisponible'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleEdit(car)}
                            className="p-2 text-gray-500 hover:text-gold-600 hover:bg-gold-50 rounded-lg transition-colors"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(car.id)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSave} className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif font-bold text-gray-900">
                  {editingCar.id ? 'Modifier le véhicule' : 'Nouveau véhicule'}
                </h2>
                <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Brand */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Marque</label>
                    <input 
                        type="text" 
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 outline-none"
                        value={editingCar.brand || ''} 
                        onChange={e => setEditingCar({...editingCar, brand: e.target.value})}
                    />
                </div>
                {/* Model */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Modèle</label>
                    <input 
                        type="text" 
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 outline-none"
                        value={editingCar.name || ''} 
                        onChange={e => setEditingCar({...editingCar, name: e.target.value})}
                    />
                </div>
                {/* Category */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Catégorie</label>
                    <input 
                        type="text" 
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 outline-none"
                        value={editingCar.category || ''} 
                        onChange={e => setEditingCar({...editingCar, category: e.target.value})}
                    />
                </div>
                 {/* Transmission */}
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Boîte de vitesse</label>
                    <select 
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 outline-none"
                        value={editingCar.gearbox || 'Manuelle'} 
                        onChange={e => setEditingCar({...editingCar, gearbox: e.target.value})}
                    >
                        <option value="Manuelle">Manuelle</option>
                        <option value="Automatique">Automatique</option>
                    </select>
                </div>
                {/* Fuel */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Carburant</label>
                    <select 
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 outline-none"
                        value={editingCar.fuel_type || 'Diesel'} 
                        onChange={e => setEditingCar({...editingCar, fuel_type: e.target.value})}
                    >
                        <option value="Diesel">Diesel</option>
                        <option value="Essence">Essence</option>
                        <option value="Hybride">Hybride</option>
                        <option value="Électrique">Électrique</option>
                    </select>
                </div>
                 {/* Price */}
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Prix par jour (MAD)</label>
                    <input 
                        type="number" 
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 outline-none"
                        value={editingCar.price_per_day || ''} 
                        onChange={e => setEditingCar({...editingCar, price_per_day: parseFloat(e.target.value)})}
                    />
                </div>
                {/* Promo Price */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Prix Promo (Optionnel)</label>
                    <input 
                        type="number" 
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 outline-none"
                        value={editingCar.promo_price || ''} 
                        onChange={e => setEditingCar({...editingCar, promo_price: e.target.value ? parseFloat(e.target.value) : null})}
                    />
                </div>
                
                {/* Image Upload */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Image du véhicule</label>
                    <div className="flex items-center gap-4">
                        {editingCar.image_url && !imageFile && (
                            <img src={editingCar.image_url} alt="Current" className="h-16 w-16 object-cover rounded-lg border border-gray-200" />
                        )}
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setImageFile(e.target.files[0]);
                                }
                            }}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold-50 file:text-gold-700 hover:file:bg-gold-100"
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                    <textarea 
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 outline-none"
                        rows={3}
                        value={editingCar.description || ''} 
                        onChange={e => setEditingCar({...editingCar, description: e.target.value})}
                    />
                </div>

                {/* Availability */}
                <div className="md:col-span-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="checkbox"
                            checked={editingCar.is_available || false}
                            onChange={e => setEditingCar({...editingCar, is_available: e.target.checked})}
                            className="w-5 h-5 text-gold-600 rounded focus:ring-gold-500 border-gray-300"
                        />
                        <span className="font-bold text-gray-700">Véhicule disponible</span>
                    </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition-colors"
                >
                    Annuler
                </button>
                <button 
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2.5 rounded-lg bg-gold-600 text-white font-bold hover:bg-gold-700 transition-all shadow-lg hover:shadow-gold-500/30 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSaving ? <Loader2 className="animate-spin" size={20} /> : <CheckIcon />}
                    {isSaving ? 'Sauvegarde...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function CheckIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
    )
}
