import { FormControl, FormGroup, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";

function CardForm() {
    const months = ["01", "02", "03", "04", "05", "06", "07", "09", "10", "11", "12"];
    const years = ["23", "24", "25", "26", "27", "28", "29"];
    const [cardNum, setCardNum] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

    function handleCardChange(event) {
        const val = event.target.value.replace(/\D/g, "").slice(0,16);
        setCardNum(val);
    }

    function handleMonthChange(event) {
        setSelectedMonth(event.target.value);
    }

    function handleYearChange(event) {
        setSelectedYear(event.target.value);
    }

    return(
        <FormGroup>
            <Grid container className="customText" spacing={2}>
                <Grid item xs={12} md={4}>
                    <TextField type="number" variant="outlined" required value={cardNum} onChange={handleCardChange}
                    placeholder="eg: 12345678xxxx" label="Card Number" name="cardNum"
                    fullWidth/>
                </Grid>
                <Grid item xs={4} md={1}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="monthId">MM</InputLabel>
                        <Select labelId="monthId" label="month" required name="month" value={selectedMonth} onChange={handleMonthChange}>
                            {months.map((month, index) => (
                                <MenuItem key={index} value={month}>{month}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4} md={1}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="yearId">YY</InputLabel>
                        <Select labelId="yearId" label="year" required name="year" value={selectedYear} onChange={handleYearChange}>
                            <MenuItem value="none" disabled>YY</MenuItem>
                            {years.map((year, index) => (
                                <MenuItem key={index} value={year}>{year}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4} md={2}>
                    <TextField type="password" variant="outlined" required
                    name="cvv" placeholder="XXX" label="CVV" inputProps={{maxLength: 3, pattern: "[0-9]*"}}/>
                </Grid>
            </Grid>        
        </FormGroup>
    )
}

export default CardForm;