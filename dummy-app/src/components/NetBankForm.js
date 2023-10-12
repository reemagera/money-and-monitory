import { FormGroup, Grid, TextField } from "@mui/material"

function NetBankForm() {
    return(
        <FormGroup id="netbank">
            <Grid container spacing={2} className="customText">
                <Grid item md={4}>
                    <TextField type="text" variant="outlined" name="username"
                    placeholder="username" label="username" required fullWidth/>
                </Grid>
                <Grid item md={4}>
                    <TextField type="password" variant="outlined" name="password"
                    placeholder="password" label="password" required fullWidth/>
                </Grid>
            </Grid>
        </FormGroup>
    )
}

export default NetBankForm;