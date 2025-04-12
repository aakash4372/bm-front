import { useState, useEffect } from 'react'
import { 
  Box, Typography, Button, Tab, Tabs, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Paper, 
  IconButton, CircularProgress, Alert 
} from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'
import axios from 'axios'
import toast from 'react-hot-toast'

const AdminPage = () => {
  const [tabValue, setTabValue] = useState(0)
  const [informationalQuotes, setInformationalQuotes] = useState([])
  const [ecommerceQuotes, setEcommerceQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchQuotes()
  }, [])

  const fetchQuotes = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get('https://server-bm.onrender.com/api/quotes/all', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      setInformationalQuotes(response.data.informational || [])
      setEcommerceQuotes(response.data.ecommerce || [])
    } catch (error) {
      console.error('Fetch error:', error)
      setError('Failed to fetch quotes. Please try again.')
      toast.error('Error fetching quotes')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this quote?')) return
    
    try {
      await axios.delete(`https://server-bm.onrender.com/api/quotes/${type}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      toast.success('Quote deleted successfully')
      fetchQuotes() // Refresh the list after deletion
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Error deleting quote')
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
        <Button onClick={fetchQuotes} variant="contained" sx={{ mt: 2 }}>
          Retry
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      
      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
        <Tab label="Informational Quotes" />
        <Tab label="E-commerce Quotes" />
      </Tabs>

      {tabValue === 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Website Name</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Total Cost</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {informationalQuotes.length > 0 ? (
                informationalQuotes.map((quote) => (
                  <TableRow key={quote._id}>
                    <TableCell>{quote.websiteName}</TableCell>
                    <TableCell>
                      {quote.fullName}<br />
                      {quote.email}<br />
                      {quote.whatsappNo}
                    </TableCell>
                    <TableCell>₹{quote.totalCost?.toLocaleString('en-IN') || '0'}</TableCell>
                    <TableCell>{new Date(quote.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <IconButton 
                        onClick={() => handleDelete('informational', quote._id)} 
                        color="error"
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No informational quotes found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {tabValue === 1 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Website Name</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Total Cost</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ecommerceQuotes.length > 0 ? (
                ecommerceQuotes.map((quote) => (
                  <TableRow key={quote._id}>
                    <TableCell>{quote.websiteName}</TableCell>
                    <TableCell>
                      {quote.fullName}<br />
                      {quote.email}<br />
                      {quote.whatsappNo}
                    </TableCell>
                    <TableCell>₹{quote.totalCost?.toLocaleString('en-IN') || '0'}</TableCell>
                    <TableCell>{new Date(quote.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <IconButton 
                        onClick={() => handleDelete('ecommerce', quote._id)} 
                        color="error"
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No e-commerce quotes found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}

export default AdminPage