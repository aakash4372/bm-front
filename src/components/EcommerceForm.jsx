// src/components/EcommerceForm.jsx
import { useState } from 'react'
import { Box, TextField, Button, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import axios from 'axios'
import toast from 'react-hot-toast'

const EcommerceForm = () => {
  const [formData, setFormData] = useState({
    websiteName: '',
    fullName: '',
    whatsappNo: '',
    email: '',
    cmsSetup: 0,
    customDesign: 0,
    banners: 0,
    bannerCost: 0,
    productPhotos: 0,
    photoCost: 0,
    contentWriter: 'no',
    categoriesProducts: 0,
    categoryProductCost: 0,
    paymentGateway: 0,
    discountsCoupons: 0,
    shippingIntegration: 0,
    taxCalculation: 0,
    sslCertificate: 0,
    contactForm: 0,
    socialMedia: 0,
    maintenance: 0,
    responsiveDesign: 0,
    emailIds: 0,
    emailCost: 0,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'contentWriter' ? value : Number(value) || value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/quotes/ecommerce', formData)
      toast.success('Quote submitted successfully!')
      setFormData({
        websiteName: '',
        fullName: '',
        whatsappNo: '',
        email: '',
        cmsSetup: 0,
        customDesign: 0,
        banners: 0,
        bannerCost: 0,
        productPhotos: 0,
        photoCost: 0,
        contentWriter: 'no',
        categoriesProducts: 0,
        categoryProductCost: 0,
        paymentGateway: 0,
        discountsCoupons: 0,
        shippingIntegration: 0,
        taxCalculation: 0,
        sslCertificate: 0,
        contactForm: 0,
        socialMedia: 0,
        maintenance: 0,
        responsiveDesign: 0,
        emailIds: 0,
        emailCost: 0,
      })
    } catch (error) {
      toast.error('Error submitting quote')
      console.error(error)
    }
  }

  const calculateTotal = () => {
    return (
      (formData.cmsSetup || 0) +
      (formData.customDesign || 0) +
      (formData.banners * formData.bannerCost || 0) +
      (formData.productPhotos * formData.photoCost || 0) +
      (formData.categoriesProducts * formData.categoryProductCost || 0) +
      (formData.paymentGateway || 0) +
      (formData.discountsCoupons || 0) +
      (formData.shippingIntegration || 0) +
      (formData.taxCalculation || 0) +
      (formData.sslCertificate || 0) +
      (formData.contactForm || 0) +
      (formData.socialMedia || 0) +
      (formData.maintenance || 0) +
      (formData.responsiveDesign || 0) +
      (formData.emailIds * formData.emailCost || 0)
    )
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Website Name"
            name="websiteName"
            value={formData.websiteName}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Your Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="WhatsApp Number"
            name="whatsappNo"
            value={formData.whatsappNo}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Features with costs */}
        {[
          { name: 'cmsSetup', label: 'CMS Setup', cost: 10000 },
          { name: 'customDesign', label: 'Custom Design', cost: 8000 },
          { name: 'banners', label: 'Number of Banners', costField: 'bannerCost' },
          { name: 'productPhotos', label: 'Product Photos', costField: 'photoCost' },
          { name: 'categoriesProducts', label: 'Categories/Products', costField: 'categoryProductCost' },
          { name: 'paymentGateway', label: 'Payment Gateway', cost: 5000 },
          { name: 'discountsCoupons', label: 'Discounts & Coupons', cost: 3000 },
          { name: 'shippingIntegration', label: 'Shipping Integration', cost: 4000 },
          { name: 'taxCalculation', label: 'Tax Calculation', cost: 3000 },
          { name: 'sslCertificate', label: 'SSL Certificate', cost: 1500 },
          { name: 'contactForm', label: 'Contact Form', cost: 1000 },
          { name: 'socialMedia', label: 'Social Media Integration', cost: 3000 },
          { name: 'maintenance', label: 'Maintenance (1 year)', cost: 8000 },
          { name: 'responsiveDesign', label: 'Responsive Design', cost: 5000 },
          { name: 'emailIds', label: 'Email IDs', costField: 'emailCost' },
        ].map((item) => (
          <React.Fragment key={item.name}>
            <Grid item xs={6} sm={4}>
              <TextField
                fullWidth
                label={item.label}
                name={item.name}
                type="number"
                value={formData[item.name]}
                onChange={handleChange}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            <Grid item xs={6} sm={2}>
              <TextField
                fullWidth
                label="Cost"
                name={item.costField || item.name}
                type="number"
                value={item.cost || formData[item.costField] || 0}
                onChange={handleChange}
                disabled={!!item.cost}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
          </React.Fragment>
        ))}

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Content Writer Needed?</InputLabel>
            <Select
              name="contentWriter"
              value={formData.contentWriter}
              onChange={handleChange}
              label="Content Writer Needed?"
            >
              <MenuItem value="no">No</MenuItem>
              <MenuItem value="basic">Basic Content (₹5000)</MenuItem>
              <MenuItem value="premium">Premium Content (₹10000)</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Total Cost: ₹{calculateTotal().toLocaleString()}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" size="large">
            Submit Quote
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default EcommerceForm