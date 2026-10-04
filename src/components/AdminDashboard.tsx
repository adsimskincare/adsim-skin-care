import React, { useState, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, UGCItem, Order } from '../types';
import { Plus, Edit2, Trash2, ShieldCheck, Check, Package, Settings, Image as ImageIcon, Eye, RefreshCw, Upload, Camera } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    ugcItems,
    addUGC,
    updateUGC,
    deleteUGC,
    orders,
    updateOrderStatus,
    settings,
    updateSettings,
    resetToDefaults
  } = useStore();

  const [activeTab, setActiveTab] = useState<'upload-assets' | 'products' | 'ugc' | 'orders' | 'settings'>('upload-assets');
  
  // Product Form State
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    category: 'Face Wash',
    size: '100 ml',
    price: 299,
    salePrice: 299,
    positioning: '',
    shortDescription: '',
    description: '',
    skinConcern: 'acne',
    skinConcernLabel: 'Acne-Prone Skin',
    suitableFor: 'Suitable for All Skin Types',
    keyIngredients: ['Salicylic Acid'],
    benefits: ['Deep Cleansing'],
    howToUse: ['Apply on wet face and rinse thoroughly.'],
    fullIngredients: 'DM Water, Glycerine, Natural Actives.',
    batchNo: 'AB2026',
    mfgExp: '06/2026 · 05/2028',
    mfgBy: "Rangrej's Aromatherapy, Surat",
    licNo: 'GC/1793',
    images: ['/src/assets/images/adsim_acnova_bottle_1791141898362.jpg'],
    stock: 200,
    isBestSeller: false,
    isFeatured: true,
    isPublished: true,
    dermatTested: true,
    rating: 4.8,
    reviewCount: 15
  });

  // UGC Form State
  const [isAddingUGC, setIsAddingUGC] = useState(false);
  const [ugcForm, setUgcForm] = useState<Partial<UGCItem>>({
    mediaUrl: '/src/assets/images/adsim_model_skincare_routine_1791143295478.jpg',
    mediaType: 'image',
    creatorName: '',
    creatorHandle: '',
    caption: '',
    productId: products[0]?.id || 'acnova',
    isPublished: true,
    isHomepageFeatured: true
  });

  const [statusMessage, setStatusMessage] = useState('');

  const showStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(''), 5000);
  };

  // File Upload Helper (FileReader to Base64)
  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Quick 1-Click Asset Replacement Handler
  const handleQuickAssetUpload = async (file: File, type: 'logo' | 'model' | string, side: 'front' | 'back' = 'front') => {
    try {
      const dataUrl = await readFileAsDataUrl(file);
      
      if (type === 'logo') {
        updateSettings({ customLogoUrl: dataUrl });
        showStatus('Brand Logo updated! The uploaded sticker logo is now active across the entire website.');
        return;
      }

      if (type === 'model') {
        updateSettings({ customModelUrl: dataUrl });
        showStatus('Model / Brand Face updated! Your uploaded model image is now live in the hero and campaign spotlight.');
        return;
      }

      // It is a product ID (e.g. acnova, glowvera, oilvera, hydrovia, moisturizing-yogurt-cream)
      const targetProd = products.find(p => p.id === type);
      if (targetProd) {
        let newImages = [...targetProd.images];
        if (side === 'front') {
          newImages[0] = dataUrl;
        } else {
          newImages[1] = dataUrl;
        }
        updateProduct({
          ...targetProd,
          images: newImages
        });
        showStatus(`Updated ${targetProd.name} (${side === 'front' ? 'Front Bottle' : 'Back Label'}) with your uploaded photo!`);
      }
    } catch (err) {
      console.error(err);
      showStatus('Error uploading file. Please try again.');
    }
  };

  // Product Form Image Uploads
  const handleProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isBack = false) => {
    if (e.target.files && e.target.files[0]) {
      const dataUrl = await readFileAsDataUrl(e.target.files[0]);
      setProductForm(prev => {
        const curImages = prev.images ? [...prev.images] : [];
        if (isBack) {
          curImages[1] = dataUrl;
        } else {
          curImages[0] = dataUrl;
        }
        return { ...prev, images: curImages };
      });
      showStatus(`Loaded ${isBack ? 'back' : 'front'} image preview.`);
    }
  };

  // Handlers for Products
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) return;

    if (productForm.id) {
      updateProduct(productForm as Product);
      showStatus(`Product "${productForm.name}" updated successfully!`);
    } else {
      addProduct(productForm as Omit<Product, 'id'>);
      showStatus(`New product "${productForm.name}" created and published!`);
    }
    setIsEditingProduct(false);
  };

  const handleEditClick = (product: Product) => {
    setProductForm({ ...product });
    setIsEditingProduct(true);
  };

  const handleNewProductClick = () => {
    setProductForm({
      name: '',
      category: 'Face Wash',
      size: '100 ml',
      price: 299,
      positioning: 'Everyday Skin Confidence',
      shortDescription: 'Gentle cleansing care for everyday skin.',
      description: 'Carefully formulated with skin-friendly actives for daily facial nourishment.',
      skinConcern: 'acne',
      skinConcernLabel: 'Acne-Prone Skin',
      suitableFor: 'Suitable for All Skin Types',
      keyIngredients: ['Green Tea Extract', 'Glycerine'],
      benefits: ['Cleanses impurities', 'Maintains skin moisture balance'],
      howToUse: ['Apply on wet skin, massage gently, rinse with water.'],
      fullIngredients: 'DM Water, Gentle Surfactants, Natural Botanical Actives.',
      batchNo: `AFW${Math.floor(100 + Math.random() * 900)}`,
      mfgExp: '06/2026 · 05/2028',
      mfgBy: "Rangrej's Aromatherapy, Surat",
      licNo: 'GC/1793',
      images: ['/src/assets/images/adsim_acnova_bottle_1791141898362.jpg'],
      stock: 150,
      isBestSeller: false,
      isFeatured: true,
      isPublished: true,
      dermatTested: true,
      rating: 4.8,
      reviewCount: 5
    });
    setIsEditingProduct(true);
  };

  // Handlers for UGC
  const handleSaveUGC = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ugcForm.creatorName || !ugcForm.caption) return;

    const matchedProduct = products.find(p => p.id === ugcForm.productId);
    const prodName = matchedProduct ? matchedProduct.name : 'ADSIM Skincare';

    addUGC({
      mediaUrl: ugcForm.mediaUrl || '/src/assets/images/adsim_model_skincare_routine_1791143295478.jpg',
      mediaType: ugcForm.mediaType || 'image',
      creatorName: ugcForm.creatorName,
      creatorHandle: ugcForm.creatorHandle || '',
      caption: ugcForm.caption,
      productId: ugcForm.productId || products[0].id,
      productName: prodName,
      isPublished: ugcForm.isPublished !== undefined ? ugcForm.isPublished : true,
      isHomepageFeatured: ugcForm.isHomepageFeatured !== undefined ? ugcForm.isHomepageFeatured : true
    });

    showStatus('New UGC Creator post added & linked to product!');
    setIsAddingUGC(false);
  };

  return (
    <div className="bg-[#F5F2EB] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="bg-[#153323] text-white p-6 sm:p-8 rounded-2xl mb-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C4A468] mb-1 font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#C4A468]" />
              <span>ADSIM CARE CMS CONTROL PANEL</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#FAF7F2]">
              Administrator Dashboard
            </h1>
            <p className="text-xs text-[#C2BDB2] mt-1 font-light">
              Directly upload your authentic camera photos for products, logo sticker, and contracted model.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetToDefaults}
              className="px-4 py-2 border border-[#335A42] hover:border-[#C4A468] text-[#FAF7F2] text-xs uppercase tracking-wider rounded-full transition-colors flex items-center gap-1.5"
              title="Reset products and settings to default catalog"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>

        {/* Status Message Notification */}
        {statusMessage && (
          <div className="mb-6 p-4 bg-[#E8F5E9] border border-[#A5D6A7] text-[#2E7D32] text-xs rounded-xl flex items-center gap-2 shadow-xs">
            <Check className="w-4 h-4 shrink-0" />
            <span className="font-medium">{statusMessage}</span>
          </div>
        )}

        {/* Tab Controls */}
        <div className="flex border-b border-[#D9D3C5] text-xs font-medium space-x-3 sm:space-x-6 mb-8 overflow-x-auto bg-[#FAF7F2] p-2 rounded-t-xl">
          <button
            onClick={() => { setActiveTab('upload-assets'); setIsEditingProduct(false); }}
            className={`py-2 px-3.5 uppercase tracking-wider flex items-center gap-2 rounded-lg transition-all ${
              activeTab === 'upload-assets' ? 'bg-[#153323] text-white font-semibold' : 'text-[#635E55] hover:text-[#153323]'
            }`}
          >
            <Camera className="w-4 h-4 text-[#C4A468]" />
            <span>Upload My Real Photos</span>
          </button>

          <button
            onClick={() => { setActiveTab('products'); setIsEditingProduct(false); }}
            className={`py-2 px-3.5 uppercase tracking-wider flex items-center gap-2 rounded-lg transition-all ${
              activeTab === 'products' ? 'bg-[#153323] text-white font-semibold' : 'text-[#635E55] hover:text-[#153323]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products ({products.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('ugc'); setIsAddingUGC(false); }}
            className={`py-2 px-3.5 uppercase tracking-wider flex items-center gap-2 rounded-lg transition-all ${
              activeTab === 'ugc' ? 'bg-[#153323] text-white font-semibold' : 'text-[#635E55] hover:text-[#153323]'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>UGC & Model ({ugcItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-2 px-3.5 uppercase tracking-wider flex items-center gap-2 rounded-lg transition-all ${
              activeTab === 'orders' ? 'bg-[#153323] text-white font-semibold' : 'text-[#635E55] hover:text-[#153323]'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2 px-3.5 uppercase tracking-wider flex items-center gap-2 rounded-lg transition-all ${
              activeTab === 'settings' ? 'bg-[#153323] text-white font-semibold' : 'text-[#635E55] hover:text-[#153323]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Store Configuration</span>
          </button>
        </div>

        {/* TAB 0: 1-CLICK UPLOAD AUTHENTIC PHOTOS */}
        {activeTab === 'upload-assets' && (
          <div className="space-y-8">
            <div className="bg-white border border-[#D9D3C5] rounded-2xl p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#EFE9DD] flex items-center justify-center text-[#153323]">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl text-[#153323]">
                    Instant Photo Uploader for ADSIM CARE Assets
                  </h2>
                  <p className="text-xs text-[#706B62]">
                    Select and upload your exact product camera shots, model photo, or logo sticker. Any file you choose here will instantly replace the asset everywhere on the live website.
                  </p>
                </div>
              </div>

              {/* 1. Global Assets: Logo Sticker & Contracted Model */}
              <div className="pt-6 border-t border-[#ECE7DC] grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Brand Logo Sticker */}
                <div className="p-5 bg-[#FAF7F2] rounded-xl border border-[#E5DFD3] flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8578] block mb-1">
                      BRAND LOGO STICKER
                    </span>
                    <h3 className="font-serif text-lg text-[#153323] mb-1">Company Sticker / Crest</h3>
                    <p className="text-xs text-[#635E55] mb-4">
                      Upload your circular gold sticker logo.
                    </p>
                  </div>

                  <label className="cursor-pointer inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#153323] hover:bg-[#1E422F] text-white text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Choose Logo File</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) handleQuickAssetUpload(e.target.files[0], 'logo');
                      }}
                    />
                  </label>
                </div>

                {/* Contracted Model Photo */}
                <div className="p-5 bg-[#FAF7F2] rounded-xl border border-[#E5DFD3] flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8578] block mb-1">
                      CONTRACTED MODEL FACE
                    </span>
                    <h3 className="font-serif text-lg text-[#153323] mb-1">Brand Ambassador Photo</h3>
                    <p className="text-xs text-[#635E55] mb-4">
                      Upload the Indian model girl photo (with signed agreement). Appears in Hero & Model Spotlight!
                    </p>
                  </div>

                  <label className="cursor-pointer inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#153323] hover:bg-[#1E422F] text-white text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Choose Model Photo File</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) handleQuickAssetUpload(e.target.files[0], 'model');
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* 2. Product Photos (Both Sides: Front & Back) */}
              <div className="pt-6 border-t border-[#ECE7DC]">
                <h3 className="font-serif text-xl text-[#153323] mb-2">
                  ADSIM Core Products: Upload Both Front & Back Views
                </h3>
                <p className="text-xs text-[#706B62] mb-6">
                  Upload your original product packaging photos. Customers will be able to flip between the front bottle and back label view.
                </p>

                <div className="space-y-6">
                  {products.map((p) => (
                    <div 
                      key={p.id}
                      className="p-5 bg-[#FAF7F2] rounded-xl border border-[#E5DFD3] flex flex-col lg:flex-row items-center justify-between gap-6"
                    >
                      {/* Product Info */}
                      <div className="flex items-center gap-4 w-full lg:w-1/3">
                        <img 
                          src={p.images[0]} 
                          alt="" 
                          className="w-14 h-16 object-contain bg-white rounded-lg p-1 border border-[#E0D9CC]" 
                        />
                        <div>
                          <span className="text-[10px] uppercase text-[#8C8578] tracking-wider block">{p.category}</span>
                          <h4 className="font-serif text-lg font-semibold text-[#153323]">{p.name}</h4>
                          <span className="text-xs font-serif font-medium text-[#2C2C2A]">₹{p.price} • {p.size}</span>
                        </div>
                      </div>

                      {/* Front & Back Upload Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-2/3 justify-end">
                        {/* Front Photo Upload */}
                        <div className="flex-1 bg-white p-3 rounded-lg border border-[#D9D3C5] flex items-center justify-between">
                          <div className="text-xs">
                            <strong className="text-[#153323] block">Front View</strong>
                            <span className="text-[11px] text-[#8C8578]">Bottle / Packaging</span>
                          </div>
                          <label className="cursor-pointer px-3 py-1.5 bg-[#FAF7F2] hover:bg-[#153323] text-[#153323] hover:text-white border border-[#D9D3C5] rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Front</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files?.[0]) handleQuickAssetUpload(e.target.files[0], p.id, 'front');
                              }}
                            />
                          </label>
                        </div>

                        {/* Back Photo Upload */}
                        <div className="flex-1 bg-white p-3 rounded-lg border border-[#D9D3C5] flex items-center justify-between">
                          <div className="text-xs">
                            <strong className="text-[#153323] block">Back Label</strong>
                            <span className="text-[11px] text-[#8C8578]">Ingredients / Batch</span>
                          </div>
                          <label className="cursor-pointer px-3 py-1.5 bg-[#FAF7F2] hover:bg-[#153323] text-[#153323] hover:text-white border border-[#D9D3C5] rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Back</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files?.[0]) handleQuickAssetUpload(e.target.files[0], p.id, 'back');
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-[#FAF7F2] p-4 rounded-xl border border-[#E5DFD3]">
              <div>
                <h2 className="font-serif text-2xl text-[#153323]">ADSIM Product Formulary</h2>
                <p className="text-xs text-[#706B62]">Publish, modify pricing, ingredients, or introduce new skincare lines.</p>
              </div>
              <button
                onClick={handleNewProductClick}
                className="px-5 py-2.5 bg-[#153323] hover:bg-[#1E422F] text-white text-xs uppercase tracking-wider font-semibold rounded-full flex items-center gap-2 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            {/* Product Edit / Add Form */}
            {isEditingProduct ? (
              <form onSubmit={handleSaveProduct} className="bg-white border border-[#D9D3C5] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#ECE7DC] pb-4">
                  <h3 className="font-serif text-2xl text-[#153323]">
                    {productForm.id ? `Edit Product: ${productForm.name}` : 'Create New ADSIM Product'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsEditingProduct(false)}
                    className="text-xs uppercase tracking-wider text-[#8C8578] hover:text-[#153323]"
                  >
                    Cancel
                  </button>
                </div>

                {/* Upload Real Images in Form */}
                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E5DFD3] grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#153323] font-semibold text-xs mb-1">Front Bottle Photo</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleProductImageUpload(e, false)}
                      className="text-xs text-[#635E55]"
                    />
                    {productForm.images?.[0] && (
                      <img src={productForm.images[0]} alt="Front preview" className="w-16 h-20 object-contain bg-white rounded mt-2 p-1 border" />
                    )}
                  </div>

                  <div>
                    <label className="block text-[#153323] font-semibold text-xs mb-1">Back Label Photo (Ingredients & Batch)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleProductImageUpload(e, true)}
                      className="text-xs text-[#635E55]"
                    />
                    {productForm.images?.[1] && (
                      <img src={productForm.images[1]} alt="Back preview" className="w-16 h-20 object-contain bg-white rounded mt-2 p-1 border" />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-[#635E55] mb-1 font-semibold">Product Name *</label>
                    <input
                      type="text"
                      required
                      value={productForm.name || ''}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      placeholder="e.g. Acnova"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D9D3C5] rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-[#635E55] mb-1 font-semibold">Category *</label>
                    <input
                      type="text"
                      required
                      value={productForm.category || ''}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      placeholder="e.g. Acne Control Face Wash"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D9D3C5] rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-[#635E55] mb-1 font-semibold">Volume / Size *</label>
                    <input
                      type="text"
                      required
                      value={productForm.size || ''}
                      onChange={(e) => setProductForm({ ...productForm, size: e.target.value })}
                      placeholder="e.g. 100 ml"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D9D3C5] rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-[#635E55] mb-1 font-semibold">Price (₹) *</label>
                    <input
                      type="number"
                      required
                      value={productForm.price || ''}
                      onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                      placeholder="299"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D9D3C5] rounded font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[#635E55] mb-1 font-semibold">Skin Concern *</label>
                    <select
                      value={productForm.skinConcern || 'acne'}
                      onChange={(e) => setProductForm({ 
                        ...productForm, 
                        skinConcern: e.target.value as any,
                        skinConcernLabel: e.target.options[e.target.selectedIndex].text
                      })}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D9D3C5] rounded"
                    >
                      <option value="acne">Acne-Prone Skin</option>
                      <option value="oil-control">Oily & Combination Skin</option>
                      <option value="tan-removal">Tan & Dullness</option>
                      <option value="hydration">Dry & Sensitive Skin</option>
                      <option value="barrier-repair">Rough / Dehydrated Texture</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#635E55] mb-1 font-semibold">Inventory Stock</label>
                    <input
                      type="number"
                      value={productForm.stock || 100}
                      onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D9D3C5] rounded font-mono"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[#635E55] mb-1 font-semibold">Positioning Tagline</label>
                    <input
                      type="text"
                      value={productForm.positioning || ''}
                      onChange={(e) => setProductForm({ ...productForm, positioning: e.target.value })}
                      placeholder="e.g. Clear Skin. Everyday Confidence."
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D9D3C5] rounded"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[#635E55] mb-1 font-semibold">Short Description</label>
                    <input
                      type="text"
                      value={productForm.shortDescription || ''}
                      onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
                      placeholder="e.g. Deep cleansing care for acne-prone skin."
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D9D3C5] rounded"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[#635E55] mb-1 font-semibold">Full Description</label>
                    <textarea
                      rows={3}
                      value={productForm.description || ''}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D9D3C5] rounded"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[#635E55] mb-1 font-semibold">Full INCI Ingredients Declaration</label>
                    <textarea
                      rows={2}
                      value={productForm.fullIngredients || ''}
                      onChange={(e) => setProductForm({ ...productForm, fullIngredients: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D9D3C5] rounded font-mono text-[11px]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#635E55] mb-1 font-semibold">Batch Number</label>
                    <input
                      type="text"
                      value={productForm.batchNo || ''}
                      onChange={(e) => setProductForm({ ...productForm, batchNo: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D9D3C5] rounded font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[#635E55] mb-1 font-semibold">Mfg / Exp Date</label>
                    <input
                      type="text"
                      value={productForm.mfgExp || ''}
                      onChange={(e) => setProductForm({ ...productForm, mfgExp: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D9D3C5] rounded font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[#635E55] mb-1 font-semibold">Manufacturer Name</label>
                    <input
                      type="text"
                      value={productForm.mfgBy || ''}
                      onChange={(e) => setProductForm({ ...productForm, mfgBy: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D9D3C5] rounded"
                    />
                  </div>
                </div>

                {/* Toggles */}
                <div className="flex flex-wrap gap-6 pt-4 border-t border-[#ECE7DC] text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.isBestSeller || false}
                      onChange={(e) => setProductForm({ ...productForm, isBestSeller: e.target.checked })}
                      className="accent-[#153323]"
                    />
                    <span>Best Seller Badge</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.isFeatured || false}
                      onChange={(e) => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                      className="accent-[#153323]"
                    />
                    <span>Featured on Homepage</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.isPublished !== false}
                      onChange={(e) => setProductForm({ ...productForm, isPublished: e.target.checked })}
                      className="accent-[#153323]"
                    />
                    <span>Published (Live in Store)</span>
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#153323] hover:bg-[#1E422F] text-white text-xs uppercase tracking-wider font-semibold rounded-full"
                  >
                    Save Product
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingProduct(false)}
                    className="px-5 py-2.5 border border-[#D9D3C5] text-[#4A4742] text-xs uppercase tracking-wider rounded-full"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              /* Product Table */
              <div className="bg-white border border-[#D9D3C5] rounded-2xl overflow-x-auto shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF7F2] border-b border-[#ECE7DC] uppercase text-[10px] text-[#8C8578] tracking-wider">
                    <tr>
                      <th className="p-4">Product</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Concern</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F5F2EB] text-[#4A4742]">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-[#FAF7F2]/60">
                        <td className="p-4 font-semibold text-[#153323] flex items-center gap-3">
                          <img src={p.images[0]} alt="" className="w-10 h-10 object-contain bg-[#FAF7F2] rounded p-1" />
                          <div>
                            <div>{p.name}</div>
                            <span className="text-[10px] text-[#8C8578] font-mono">{p.size}</span>
                          </div>
                        </td>
                        <td className="p-4">{p.category}</td>
                        <td className="p-4">{p.skinConcernLabel}</td>
                        <td className="p-4 font-serif font-medium tabular-nums">₹{p.price}</td>
                        <td className="p-4 font-mono">{p.stock}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            p.isPublished ? 'bg-[#E8F5E9] text-[#2E7D32]' : 'bg-[#ECEFF1] text-[#607D8B]'
                          }`}>
                            {p.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEditClick(p)}
                              className="p-1.5 text-[#153323] hover:bg-[#FAF7F2] rounded"
                              title="Edit product"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                                  deleteProduct(p.id);
                                  showStatus(`Product ${p.name} deleted.`);
                                }
                              }}
                              className="p-1.5 text-[#C53929] hover:bg-[#FFEBEE] rounded"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: UGC & MODEL MANAGEMENT */}
        {activeTab === 'ugc' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-[#FAF7F2] p-4 rounded-xl border border-[#E5DFD3]">
              <div>
                <h2 className="font-serif text-2xl text-[#153323]">Contracted Model & UGC Content</h2>
                <p className="text-xs text-[#706B62]">
                  Upload community skincare posts, reels and routine photos linked directly to ADSIM CARE products.
                </p>
              </div>
              <button
                onClick={() => setIsAddingUGC(true)}
                className="px-5 py-2.5 bg-[#153323] hover:bg-[#1E422F] text-white text-xs uppercase tracking-wider font-semibold rounded-full flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add UGC Post</span>
              </button>
            </div>

            {/* UGC Add Form */}
            {isAddingUGC ? (
              <form onSubmit={handleSaveUGC} className="bg-white border border-[#D9D3C5] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm text-xs">
                <h3 className="font-serif text-2xl text-[#153323] border-b border-[#ECE7DC] pb-3">
                  Upload & Connect UGC Content
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#635E55] mb-1 font-semibold">Creator / Model Name *</label>
                    <input
                      type="text"
                      required
                      value={ugcForm.creatorName || ''}
                      onChange={(e) => setUgcForm({ ...ugcForm, creatorName: e.target.value })}
                      placeholder="e.g. Contracted Brand Ambassador"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D9D3C5] rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-[#635E55] mb-1 font-semibold">Social Handle</label>
                    <input
                      type="text"
                      value={ugcForm.creatorHandle || ''}
                      onChange={(e) => setUgcForm({ ...ugcForm, creatorHandle: e.target.value })}
                      placeholder="e.g. @adsim.care"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D9D3C5] rounded"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#635E55] mb-1 font-semibold">Connected ADSIM Product *</label>
                    <select
                      value={ugcForm.productId || products[0]?.id}
                      onChange={(e) => setUgcForm({ ...ugcForm, productId: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D9D3C5] rounded font-medium"
                    >
                      {products.map((prod) => (
                        <option key={prod.id} value={prod.id}>
                          {prod.name} ({prod.category} - ₹{prod.price})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#635E55] mb-1 font-semibold">Caption / Story *</label>
                    <textarea
                      rows={3}
                      required
                      value={ugcForm.caption || ''}
                      onChange={(e) => setUgcForm({ ...ugcForm, caption: e.target.value })}
                      placeholder="What did the creator experience using this formulation?"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D9D3C5] rounded"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#635E55] mb-1 font-semibold">Upload Photo File directly</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        if (e.target.files?.[0]) {
                          const dataUrl = await readFileAsDataUrl(e.target.files[0]);
                          setUgcForm(prev => ({ ...prev, mediaUrl: dataUrl }));
                          showStatus('Loaded UGC photo preview.');
                        }
                      }}
                      className="text-xs text-[#635E55]"
                    />
                    {ugcForm.mediaUrl && (
                      <img src={ugcForm.mediaUrl} alt="" className="w-20 h-24 object-cover rounded mt-2 border" />
                    )}
                  </div>
                </div>

                <div className="flex gap-4 pt-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={ugcForm.isHomepageFeatured !== false}
                      onChange={(e) => setUgcForm({ ...ugcForm, isHomepageFeatured: e.target.checked })}
                      className="accent-[#153323]"
                    />
                    <span>Feature on Homepage ("See ADSIM In Real Life")</span>
                  </label>
                </div>

                <div className="flex gap-3 pt-4 border-t border-[#ECE7DC]">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#153323] text-white uppercase tracking-wider font-semibold rounded-full"
                  >
                    Save & Publish UGC
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingUGC(false)}
                    className="px-5 py-2.5 border border-[#D9D3C5] text-[#4A4742] uppercase tracking-wider rounded-full"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              /* UGC Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {ugcItems.map((u) => {
                  const linkedProd = products.find(p => p.id === u.productId);
                  return (
                    <div key={u.id} className="bg-white border border-[#D9D3C5] rounded-xl overflow-hidden flex flex-col justify-between shadow-xs">
                      <div>
                        <div className="aspect-[3/4] bg-[#EDE7DA] overflow-hidden relative">
                          <img src={u.mediaUrl} alt="" className="w-full h-full object-cover" />
                          <div className="absolute top-2 right-2 flex gap-1">
                            <button
                              onClick={() => {
                                deleteUGC(u.id);
                                showStatus('UGC item deleted');
                              }}
                              className="p-1.5 bg-black/60 text-white rounded-full hover:bg-[#C53929]"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <div className="p-4 space-y-1">
                          <div className="flex items-center justify-between text-[11px] font-semibold text-[#153323]">
                            <span>{u.creatorName}</span>
                            <span className="text-[#8C8578] font-normal">{u.creatorHandle}</span>
                          </div>
                          <p className="text-[11px] text-[#635E55] line-clamp-2">“{u.caption}”</p>
                        </div>
                      </div>

                      <div className="p-3 bg-[#FAF7F2] border-t border-[#ECE7DC] text-[11px] flex items-center justify-between">
                        <span className="text-[#8C8578]">Product:</span>
                        <strong className="text-[#153323] truncate max-w-[150px]">{linkedProd?.name || u.productName}</strong>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E5DFD3]">
              <h2 className="font-serif text-2xl text-[#153323]">Customer Orders & Dispatch</h2>
              <p className="text-xs text-[#706B62]">Manage fulfillment status, dispatch parcels, and verify payment gateways.</p>
            </div>

            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.id} className="bg-white border border-[#D9D3C5] rounded-xl p-6 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#ECE7DC]">
                    <div>
                      <span className="font-serif text-lg font-semibold text-[#153323]">Order #{ord.id}</span>
                      <span className="text-xs text-[#8C8578] ml-2">Date: {ord.date}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-[#635E55] font-medium">Update Status:</span>
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                        className="p-1.5 bg-[#FAF7F2] border border-[#D9D3C5] rounded font-semibold text-[#153323]"
                      >
                        <option value="Order Received">Order Received</option>
                        <option value="Order Confirmed">Order Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Ready for Dispatch">Ready for Dispatch</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#5A554C]">
                    <div>
                      <strong className="text-[#153323] block mb-0.5">Customer:</strong>
                      <p>{ord.customerName}</p>
                      <p>{ord.mobile} • {ord.email}</p>
                    </div>

                    <div>
                      <strong className="text-[#153323] block mb-0.5">Delivery Address:</strong>
                      <p>{ord.address}, {ord.city}, {ord.state} - {ord.pincode}</p>
                    </div>

                    <div>
                      <strong className="text-[#153323] block mb-0.5">Payment & Items:</strong>
                      <p className="font-serif font-medium text-[#153323]">Total: ₹{ord.total} ({ord.paymentMethod})</p>
                      <p className="text-[#7A756B]">{ord.items.length} items ordered</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: STORE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white border border-[#D9D3C5] rounded-2xl p-6 sm:p-8 max-w-2xl shadow-xs space-y-6 text-xs">
            <h2 className="font-serif text-2xl text-[#153323] border-b border-[#ECE7DC] pb-3">
              Store Configuration
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-[#635E55] mb-1 font-semibold">Top Announcement Bar Text</label>
                <input
                  type="text"
                  value={settings.announcementText}
                  onChange={(e) => updateSettings({ announcementText: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#D9D3C5] rounded"
                />
              </div>

              <div>
                <label className="block text-[#635E55] mb-1 font-semibold">Free Delivery Threshold (₹)</label>
                <input
                  type="number"
                  value={settings.freeShippingThreshold}
                  onChange={(e) => updateSettings({ freeShippingThreshold: Number(e.target.value) })}
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#D9D3C5] rounded font-mono"
                />
              </div>

              <div>
                <label className="block text-[#635E55] mb-1 font-semibold">Official WhatsApp Helpline Number (with country code)</label>
                <input
                  type="text"
                  value={settings.whatsAppNumber}
                  onChange={(e) => updateSettings({ whatsAppNumber: e.target.value })}
                  placeholder="917079572343"
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#D9D3C5] rounded font-mono"
                />
              </div>

              <div>
                <label className="block text-[#635E55] mb-1 font-semibold">Support Email</label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => updateSettings({ contactEmail: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#D9D3C5] rounded"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-[#153323]">
                  <input
                    type="checkbox"
                    checked={settings.enableCod}
                    onChange={(e) => updateSettings({ enableCod: e.target.checked })}
                    className="accent-[#153323]"
                  />
                  <span>Enable Cash on Delivery (COD) Option at Checkout</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-[#ECE7DC]">
              <button
                type="button"
                onClick={() => showStatus('Store settings updated successfully!')}
                className="px-6 py-2.5 bg-[#153323] hover:bg-[#1E422F] text-white uppercase tracking-wider font-semibold rounded-full"
              >
                Save Store Settings
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
