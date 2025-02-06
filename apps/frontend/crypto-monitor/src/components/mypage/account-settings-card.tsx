import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AccountSettingsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>계정 설정</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="outline" className="w-full">
          비밀번호 변경
        </Button>
        <Button variant="outline" className="w-full">
          알림 설정
        </Button>
        <Button variant="outline" className="w-full text-red-500 hover:text-red-600">
          계정 삭제
        </Button>
      </CardContent>
    </Card>
  );
}
