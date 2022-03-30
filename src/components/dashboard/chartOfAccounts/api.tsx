import axios from "axios"

export const getAllCoa = async (
  hasUnMounted: Boolean,
  setCoa: React.Dispatch<React.SetStateAction<any>>,
  filter: object,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {

  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/coa/filtered`, { params: filter })
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) {
        if (res.data.data.length) {
          const idMapping = res.data.data.reduce((acc: any, ele: any, i: any) => {
            acc[ele.uuid] = i
            return acc
          }, {})
          let root = null;
          res.data.data.forEach((el: any) => {
            if (!el.parent) {
              root = el;
              return;
            }
            const parentEl = res.data.data[idMapping[el.parent.uuid]];
            parentEl.children = [...(parentEl.children || []), el];
          });
          setCoa(root)
        } else {
          setSnackbar({ open: true, message: "There's no record for the current selection" })
        }
      }
      else {
        setSnackbar({ open: true, message: "Failed to fetch Chart of Account" })
      }
    }
  } catch (err: any) {
    if (!hasUnMounted) {
      setSnackbar({ open: true, message: "Failed to fetch Chart of Account" })
    }
  }
}

export const updateCoa = async (
  coaId: string,
  body: any,
  oldData: any,
  companies: any,
  financialYear: any,
  showSnackbar: Function
) => {
  try {
    const updatedData = { ...oldData, ...body }
    const payload = {
      ...updatedData,
      company: companies.filter((x: any) => x.name === updatedData.company)[0].uuid,
      financialYear: financialYear.filter((x: any) => x.fy_year === updatedData.financialYear)[0].uuid
    }
    const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/coa/${coaId}`, payload)
    if (res.data.statusCode === 200) {
      showSnackbar("COA has been updated")
      return res.data.data
    }
    else {
      showSnackbar("Failed to update COA")
    }
  } catch (error: any) {
    showSnackbar("Failed to update COA")
  }
}

export const createCoa = async (
  data: any,
  companies: any,
  financialYear: any,
  showSnackbar: Function
) => {
  try {
    const body = {
      ...data,
      company: companies.filter((x: any) => x.name === data.company)[0].uuid,
      financialYear: financialYear.filter((x: any) => x.fy_year === data.financialYear)[0].uuid
    }
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/coa`, body)
    if (res.data.statusCode === 200) {
      showSnackbar("New Chart of Account has been created")
      return res.data.data
    }
    else {
      showSnackbar("Failed to create Chart of Account")
    }
  } catch (error: any) {
    showSnackbar("Failed to create Chart of Account")
  }
}

export const deleteCoa = async (
  coaId: any,
  showSnackbar: Function
) => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/coa/${coaId}`)
    if (res.data.statusCode === 200) {
      showSnackbar("COA has been deleted")
      return res.data.data
    }
    else {
      showSnackbar("Failed to delete COA")
    }
  } catch (error: any) {
    showSnackbar("Failed to delete COA")
  }
}

export const getAllFinancialYear = async (
  hasUnMounted: Boolean,
  setFinancialYear: React.Dispatch<React.SetStateAction<any[]>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/financial-year`)
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) {
        setFinancialYear(res.data?.data)
      }
      else {
        setSnackbar({ open: true, message: "Failed to fetch fiancial years" })
      }
    }
  } catch (err) {
    if (!hasUnMounted) {
      setSnackbar({ open: true, message: "Failed to fetch financial years" })
    }
  }
}