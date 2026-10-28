import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, Check, Car, DollarSign, FileText, ArrowRight, Eye, ExternalLink, X, ImagePlus } from 'lucide-react';
import { useListings } from '../context/ListingsContext';

export default function SellPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    make: '', model: '', year: '', mileage: '', price: '',
    fuel: '', transmission: '', color: '', description: '',
    name: '', email: '', phone: '',
    category: '', location: '', engine: '', drivetrain: '', horsepower: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [createdListing, setCreatedListing] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const { addListing } = useListings();
  const navigate = useNavigate();

  const steps = [
    { num: 1, label: 'Vehicle Info', icon: Car },
    { num: 2, label: 'Details & Photos', icon: Camera },
    { num: 3, label: 'Pricing & Contact', icon: DollarSign },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = (files) => {
    const validFiles = Array.from(files).filter(
      (file) => file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024
    );
    const newImages = validFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setUploadedImages((prev) => [...prev, ...newImages].slice(0, 8));
  };

  const removeImage = (index) => {
    setUploadedImages((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].url);
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataWithImage = {
      ...formData,
      imageUrl: uploadedImages.length > 0 ? uploadedImages[0].url : '',
    };
    const listing = addListing(dataWithImage);
    setCreatedListing(listing);
    setSubmitted(true);
  };

  if (submitted && createdListing) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-4 animate-fade-in-up">
          <div className="w-20 h-20 rounded-full price-gradient flex items-center justify-center mx-auto mb-6 glow-primary">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white mb-3">Listing Published!</h1>
          <p className="text-surface-200/50 mb-4">
            Your <span className="text-white font-semibold">{createdListing.year} {createdListing.title}</span> is now live on the marketplace and visible to all buyers.
          </p>

          {/* Listing Summary Card */}
          <div className="glass rounded-2xl p-6 mb-8 text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl price-gradient flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-white">{createdListing.year} {createdListing.title}</p>
                <p className="text-sm text-surface-200/50">{createdListing.location}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded-xl bg-surface-800/30 border border-white/5">
                <p className="text-surface-200/40 text-xs mb-0.5">Price</p>
                <p className="font-semibold gradient-text">${createdListing.price.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl bg-surface-800/30 border border-white/5">
                <p className="text-surface-200/40 text-xs mb-0.5">Mileage</p>
                <p className="font-semibold text-white">{createdListing.mileage.toLocaleString()} mi</p>
              </div>
              <div className="p-3 rounded-xl bg-surface-800/30 border border-white/5">
                <p className="text-surface-200/40 text-xs mb-0.5">Category</p>
                <p className="font-semibold text-white">{createdListing.category}</p>
              </div>
              <div className="p-3 rounded-xl bg-surface-800/30 border border-white/5">
                <p className="text-surface-200/40 text-xs mb-0.5">Color</p>
                <p className="font-semibold text-white">{createdListing.color}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              id="view-my-listing-btn"
              onClick={() => navigate(`/car/${createdListing.id}`)}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white price-gradient hover:opacity-90 transition-all glow-primary"
            >
              <Eye className="w-4 h-4" />
              View My Listing
            </button>
            <button
              id="browse-all-btn"
              onClick={() => navigate('/browse')}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-white/5 border border-white/10 hover:border-primary-500/30 hover:bg-primary-600/10 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              Browse All Cars
            </button>
          </div>
          <button
            onClick={() => { setSubmitted(false); setCurrentStep(1); setCreatedListing(null); setUploadedImages([]); setFormData({ make: '', model: '', year: '', mileage: '', price: '', fuel: '', transmission: '', color: '', description: '', name: '', email: '', phone: '', category: '', location: '', engine: '', drivetrain: '', horsepower: '' }); }}
            className="mt-4 text-sm text-surface-200/40 hover:text-primary-300 transition-colors underline underline-offset-2"
          >
            List Another Vehicle
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
            Sell Your <span className="gradient-text">Vehicle</span>
          </h1>
          <p className="text-surface-200/50 text-lg">
            Reach thousands of qualified buyers. List for free, sell fast.
          </p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((step, i) => (
            <div key={step.num} className="flex items-center">
              <button
                onClick={() => setCurrentStep(step.num)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  currentStep === step.num
                    ? 'text-white price-gradient shadow-lg'
                    : currentStep > step.num
                    ? 'text-green-400 bg-green-500/10 border border-green-500/20'
                    : 'text-surface-200/40 bg-surface-800/50 border border-white/5'
                }`}
              >
                {currentStep > step.num ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <step.icon className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">{step.label}</span>
                <span className="sm:hidden">{step.num}</span>
              </button>
              {i < steps.length - 1 && (
                <div className={`w-8 sm:w-16 h-px mx-2 ${currentStep > step.num ? 'bg-green-500/50' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8">
          {/* Step 1: Vehicle Info */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Car className="w-5 h-5 text-primary-400" />
                Vehicle Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-surface-200/60 mb-2">Make *</label>
                  <input
                    id="sell-make"
                    name="make" value={formData.make} onChange={handleChange} required
                    placeholder="e.g., BMW"
                    className="w-full px-4 py-3 rounded-xl bg-surface-800/50 text-white placeholder-surface-200/30 border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-200/60 mb-2">Model *</label>
                  <input
                    id="sell-model"
                    name="model" value={formData.model} onChange={handleChange} required
                    placeholder="e.g., M4 Competition"
                    className="w-full px-4 py-3 rounded-xl bg-surface-800/50 text-white placeholder-surface-200/30 border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-200/60 mb-2">Year *</label>
                  <input
                    id="sell-year"
                    name="year" value={formData.year} onChange={handleChange} required type="number"
                    placeholder="2024"
                    className="w-full px-4 py-3 rounded-xl bg-surface-800/50 text-white placeholder-surface-200/30 border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-200/60 mb-2">Mileage *</label>
                  <input
                    id="sell-mileage"
                    name="mileage" value={formData.mileage} onChange={handleChange} required type="number"
                    placeholder="12000"
                    className="w-full px-4 py-3 rounded-xl bg-surface-800/50 text-white placeholder-surface-200/30 border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-surface-200/60 mb-2">Category *</label>
                  <select
                    id="sell-category"
                    name="category" value={formData.category} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-xl bg-surface-800/50 text-white border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                  >
                    <option value="">Select Category</option>
                    <option>Sports</option>
                    <option>Sedan</option>
                    <option>SUV</option>
                    <option>Electric</option>
                    <option>Truck</option>
                    <option>Coupe</option>
                    <option>Convertible</option>
                    <option>Hatchback</option>
                    <option>Van</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-200/60 mb-2">Location *</label>
                  <input
                    id="sell-location"
                    name="location" value={formData.location} onChange={handleChange} required
                    placeholder="e.g., Los Angeles, CA"
                    className="w-full px-4 py-3 rounded-xl bg-surface-800/50 text-white placeholder-surface-200/30 border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white price-gradient hover:opacity-90 transition-all"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary-400" />
                Details & Photos
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-surface-200/60 mb-2">Fuel Type</label>
                  <select
                    id="sell-fuel"
                    name="fuel" value={formData.fuel} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-surface-800/50 text-white border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                  >
                    <option value="">Select</option>
                    <option>Gasoline</option>
                    <option>Diesel</option>
                    <option>Electric</option>
                    <option>Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-200/60 mb-2">Transmission</label>
                  <select
                    id="sell-transmission"
                    name="transmission" value={formData.transmission} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-surface-800/50 text-white border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                  >
                    <option value="">Select</option>
                    <option>Automatic</option>
                    <option>Manual</option>
                    <option>CVT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-200/60 mb-2">Color</label>
                  <input
                    id="sell-color"
                    name="color" value={formData.color} onChange={handleChange}
                    placeholder="e.g., Black"
                    className="w-full px-4 py-3 rounded-xl bg-surface-800/50 text-white placeholder-surface-200/30 border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-surface-200/60 mb-2">Engine</label>
                  <input
                    id="sell-engine"
                    name="engine" value={formData.engine} onChange={handleChange}
                    placeholder="e.g., 3.0L Twin-Turbo I6"
                    className="w-full px-4 py-3 rounded-xl bg-surface-800/50 text-white placeholder-surface-200/30 border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-200/60 mb-2">Drivetrain</label>
                  <select
                    id="sell-drivetrain"
                    name="drivetrain" value={formData.drivetrain} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-surface-800/50 text-white border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                  >
                    <option value="">Select</option>
                    <option>FWD</option>
                    <option>RWD</option>
                    <option>AWD</option>
                    <option>4WD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-200/60 mb-2">Horsepower</label>
                  <input
                    id="sell-horsepower"
                    name="horsepower" value={formData.horsepower} onChange={handleChange} type="number"
                    placeholder="e.g., 400"
                    className="w-full px-4 py-3 rounded-xl bg-surface-800/50 text-white placeholder-surface-200/30 border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-200/60 mb-2">Description</label>
                <textarea
                  id="sell-description"
                  name="description" value={formData.description} onChange={handleChange}
                  rows={4}
                  placeholder="Describe your vehicle's condition, features, and history..."
                  className="w-full px-4 py-3 rounded-xl bg-surface-800/50 text-white placeholder-surface-200/30 border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all resize-none"
                />
              </div>

              {/* Photo upload zone */}
              <div>
                <label className="block text-sm font-medium text-surface-200/60 mb-2">
                  Photos <span className="text-surface-200/30">({uploadedImages.length}/8)</span>
                </label>

                {/* Upload area */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer ${
                    isDragging
                      ? 'border-primary-500/60 bg-primary-600/10 scale-[1.01]'
                      : 'border-white/10 hover:border-primary-500/30 hover:bg-primary-600/5'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e.target.files)}
                    className="hidden"
                    id="sell-photos"
                  />
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 ${
                    isDragging ? 'bg-primary-600/30' : 'bg-surface-800/50'
                  }`}>
                    <ImagePlus className={`w-6 h-6 transition-colors ${isDragging ? 'text-primary-400' : 'text-surface-200/30'}`} />
                  </div>
                  <p className="text-sm text-surface-200/50 mb-1">
                    {isDragging ? 'Drop your photos here!' : 'Drag & drop photos here, or click to browse'}
                  </p>
                  <p className="text-xs text-surface-200/30">JPG, PNG, WebP up to 10MB each · Max 8 photos</p>
                </div>

                {/* Image previews */}
                {uploadedImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {uploadedImages.map((img, index) => (
                      <div key={index} className="relative group rounded-xl overflow-hidden aspect-[4/3] border border-white/5">
                        <img
                          src={img.url}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {index === 0 && (
                          <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider text-white price-gradient">
                            Cover
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                          className="absolute top-1.5 right-1.5 w-7 h-7 rounded-lg bg-red-500/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-500 hover:scale-110"
                        >
                          <X className="w-3.5 h-3.5 text-white" />
                        </button>
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-3 rounded-xl font-semibold text-surface-200/60 bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white price-gradient hover:opacity-90 transition-all"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Pricing & Contact */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary-400" />
                Pricing & Contact
              </h2>

              <div>
                <label className="block text-sm font-medium text-surface-200/60 mb-2">Asking Price ($) *</label>
                <input
                  id="sell-price"
                  name="price" value={formData.price} onChange={handleChange} required type="number"
                  placeholder="65000"
                  className="w-full px-4 py-3 rounded-xl bg-surface-800/50 text-white placeholder-surface-200/30 border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                />
              </div>

              <div className="h-px bg-white/5" />

              <h3 className="font-display font-semibold text-white">Contact Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-surface-200/60 mb-2">Full Name *</label>
                  <input
                    id="sell-name"
                    name="name" value={formData.name} onChange={handleChange} required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-surface-800/50 text-white placeholder-surface-200/30 border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-200/60 mb-2">Phone</label>
                  <input
                    id="sell-phone"
                    name="phone" value={formData.phone} onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 rounded-xl bg-surface-800/50 text-white placeholder-surface-200/30 border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-200/60 mb-2">Email *</label>
                <input
                  id="sell-email"
                  name="email" value={formData.email} onChange={handleChange} required type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-surface-800/50 text-white placeholder-surface-200/30 border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                />
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 rounded-xl font-semibold text-surface-200/60 bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  id="sell-submit"
                  className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white price-gradient hover:opacity-90 transition-all glow-primary"
                >
                  Submit Listing
                  <Check className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
