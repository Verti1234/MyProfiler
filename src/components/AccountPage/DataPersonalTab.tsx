
import { Card, CardContent,CardHeader, CardTitle } from '../ui/card'
import { ChangePersonalForm } from './ChangePersonalDataForm'



export default function DataPersonalTab() {
  return (
    <Card className="h-full w-full">
          <CardHeader>
            <CardTitle>Zmień dane personalne</CardTitle>
          </CardHeader>
          <CardContent>
            <ChangePersonalForm />
          </CardContent>
        </Card>
  )
}
