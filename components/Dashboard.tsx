import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { SupabaseCar } from '../types';
import { Plus, Edit, Trash2, LogOut, Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [cars, setCars] = useState<SupabaseCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<SupabaseCar | null>(null);
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price_per_day: '',
    fuel_type: 'Diesel',
    gearbox: 'Manuelle',
    category: 'Berline',
    image_file: null as File | null,
    image_url: ''
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkUser();
    fetchCars();
  }, []);

  // Cleanup preview URL on unmount or change
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/login');
    }
  };

  const fetchCars = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setCars(data);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      const { error } = await supabase.from('cars').delete().eq('id', id);
      if (!error) {
        setCars(cars.filter(c => c.id !== id));
      } else {
        alert("Erreur lors de la suppression: " + error.message);
      }
    }
  };

  const openModal = (car?: SupabaseCar) => {
    setError(null);
    if (car) {
      setEditingCar(car);
      setFormData({
        name: car.name,
        brand: car.brand,
        price_per_day: car.price_per_day.toString(),
        fuel_type: car.fuel_type,
        gearbox: car.gearbox,
        category: car.category,
        image_file: null,
        image_url: car.image_url
      });
      setPreviewUrl(car.image_url);
    } else {
      setEditingCar(null);
      setFormData({
        name: '',
        brand: '',
        price_per_day: '',
        fuel_type: 'Diesel',
        gearbox: 'Manuelle',
        category: 'Berline',
        image_file: null,
        image_url: ''
      });
      setPreviewUrl(null);
    }
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, image_file: file });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('car-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('car-images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploading) return; // Prevent double submit
    
    setUploading(true);
    setError(null);

    try {
      // Input Validation
      if (!formData.brand.trim()) throw new Error("La marque est requise.");
      if (!formData.name.trim()) throw new Error("Le modèle est requis.");
      
      const price = parseFloat(formData.price_per_day);
      if (isNaN(price) || price <= 0) {
        throw new Error("Le prix doit être un nombre valide supérieur à 0.");
      }

      let imageUrl = formData.image_url;

      if (formData.image_file) {
        imageUrl = await handleImageUpload(formData.image_file);
      } else if (!imageUrl && !editingCar) {
         throw new Error("Veuillez uploader une image pour le véhicule.");
      }

      const carData = {
        name: formData.name,
        brand: formData.brand,
        price_per_day: price,
        fuel_type: formData.fuel_type,
        gearbox: formData.gearbox,
        category: formData.category,
        image_url: imageUrl,
        is_available: true 
      };

      if (editingCar) {
        const { error } = await supabase
          .from('cars')
          .update(carData)
          .eq('id', editingCar.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('cars')
          .insert([carData]);
        if (error) throw error;
      }

      setIsModalOpen(false);
      fetchCars();
    } catch (error: any) {
      console.error('Error saving car:', error);
      setError(error.message || 'Une erreur inconnue est survenue');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Navbar */}
      <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
             <span className="text-xl font-serif font-bold tracking-wider">TREVI <span className="text-gold-500">ADMIN</span></span>
          </div>
          <div className="flex items-center gap-4">
             <a href="/" className="text-sm text-gray-400 hover:text-white transition-colors" target="_blank">Voir le site</a>
             <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm transition-colors">
               <LogOut size={16} /> Déconnexion
             </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
             <h1 className="text-3xl font-bold text-gray-900">Gestion de la Flotte</h1>
             <p className="text-gray-500 mt-1">{cars.length} véhicules enregistrés</p>
          </div>
          <button 
            onClick={() => openModal()} 
            className="flex items-center gap-2 bg-gold-600 hover:bg-gold-700 text-white px-5 py-3 rounded-lg shadow-md transition-all hover:scale-105"
          >
            <Plus size={20} /> Ajouter un Véhicule
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
           <div className="flex justify-center py-20">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600"></div>
           </div>
        ) : (
          /* Cars Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cars.map((car) => (
              <div key={car.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                   {car.image_url ? (
                     <img src={car.image_url} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ImageIcon size={32} />
                     </div>
                   )}
                   <div className="absolute top-2 right-2 flex gap-1">
                      <button onClick={() => openModal(car)} className="p-2 bg-white/90 hover:bg-gold-500 hover:text-white rounded-full shadow transition-colors">
                         <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(car.id)} className="p-2 bg-white/90 hover:bg-red-500 hover:text-white rounded-full shadow transition-colors">
                         <Trash2 size={16} />
                      </button>
                   </div>
                   <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <p className="text-white font-bold text-lg">{car.price_per_day} MAD<span className="text-xs font-normal opacity-80">/jour</span></p>
                   </div>
                </div>
                <div className="p-4">
                   <h3 className="font-bold text-lg text-gray-800">{car.brand} {car.name}</h3>
                   <div className="flex flex-wrap gap-2 mt-3">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">{car.category}</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">{car.fuel_type}</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">{car.gearbox}</span>
                   </div>
                </div>
              </div>
            ))}
            
            {cars.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-200">
                    <p>Aucun véhicule dans la flotte. Ajoutez votre premier véhicule !</p>
                </div>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
               <h2 className="text-xl font-bold text-gray-900">{editingCar ? 'Modifier le Véhicule' : 'Nouveau Véhicule'}</h2>
               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600" disabled={uploading}>
                 <X size={24} />
               </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
               {error && (
                   <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-lg flex items-center gap-2 text-sm">
                       <AlertCircle size={16} />
                       {error}
                   </div>
               )}
            
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Marque *</label>
                    <input 
                        required 
                        type="text" 
                        className="w-full p-3 border rounded-lg focus:ring-gold-500 focus:border-gold-500" 
                        placeholder="Ex: Dacia" 
                        value={formData.brand} 
                        onChange={e => setFormData({...formData, brand: e.target.value})} 
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Modèle *</label>
                    <input 
                        required 
                        type="text" 
                        className="w-full p-3 border rounded-lg focus:ring-gold-500 focus:border-gold-500" 
                        placeholder="Ex: Logan" 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prix par jour (MAD) *</label>
                    <input 
                        required 
                        type="number" 
                        min="1" 
                        step="1"
                        className="w-full p-3 border rounded-lg focus:ring-gold-500 focus:border-gold-500" 
                        placeholder="Ex: 300" 
                        value={formData.price_per_day} 
                        onChange={e => setFormData({...formData, price_per_day: e.target.value})} 
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                    <select className="w-full p-3 border rounded-lg bg-white" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                      <option>Berline</option>
                      <option>SUV</option>
                      <option>Citadine</option>
                      <option>Luxe</option>
                      <option>4x4</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Carburant</label>
                    <select className="w-full p-3 border rounded-lg bg-white" value={formData.fuel_type} onChange={e => setFormData({...formData, fuel_type: e.target.value})}>
                      <option>Diesel</option>
                      <option>Essence</option>
                      <option>Hybride</option>
                      <option>Électrique</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Boîte de Vitesse</label>
                    <select className="w-full p-3 border rounded-lg bg-white" value={formData.gearbox} onChange={e => setFormData({...formData, gearbox: e.target.value})}>
                      <option>Manuelle</option>
                      <option>Automatique</option>
                    </select>
                 </div>
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">Image du Véhicule *</label>
                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors relative group">
                    {previewUrl ? (
                        <div className="text-center w-full relative z-10">
                            <img src={previewUrl} alt="Aperçu" className="h-40 object-contain mx-auto mb-2 rounded shadow-sm bg-white" />
                            <div className="mt-2 text-xs text-green-600 font-medium flex items-center justify-center gap-1">
                                {formData.image_file ? (
                                    <>
                                        <ImageIcon size={14} />
                                        {formData.image_file.name}
                                    </>
                                ) : (
                                    <span>Image actuelle</span>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 relative z-10 pointer-events-none">
                           <Upload className="mx-auto h-8 w-8 mb-2 opacity-50" />
                           <span className="text-sm">Glisser-déposer ou cliquer pour uploader</span>
                        </div>
                    )}
                    <input 
                       type="file" 
                       accept="image/*" 
                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
                       onChange={handleFileChange}
                       required={!editingCar} // Required only if creating new
                    />
                 </div>
               </div>

               <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                  <button type="button" onClick={() => setIsModalOpen(false)} disabled={uploading} className="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50">Annuler</button>
                  <button 
                    type="submit" 
                    disabled={uploading}
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-700 text-white font-medium rounded-lg shadow-lg flex items-center gap-2 disabled:opacity-50 transition-all disabled:cursor-not-allowed"
                  >
                    {uploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Enregistrement...
                      </>
                    ) : (
                      'Enregistrer'
                    )}
                  </button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;