import React, { useEffect, useState } from 'react';
import { Check, AlertCircle, RefreshCw, X as XIcon, Menu, Clock, ArrowLeft } from 'lucide-react';

const oldRawData = [
  { q: "Trong thiết kế UI, yếu tố nào quan trọng nhất khi chọn font chữ?", opts: ["A. Tính dễ đọc (Legibility)", "B. Số lượng biến thể của font", "C. Sự phức tạp của kiểu chữ", "D. Chỉ cần đẹp mắt, không quan trọng tính dễ đọc"], ans: [0] },
  { q: "Khi sử dụng quá nhiều font chữ khác nhau trong cùng một thiết kế UI, điều gì có thể xảy ra?", opts: ["A. Làm cho giao diện chuyên nghiệp hơn", "B. Giúp phân biệt các nội dung rõ ràng hơn", "C. Khiến thiết kế trở nên rối mắt và thiếu nhất quán", "D. Không có ảnh hưởng gì"], ans: [2] },
  { q: "Trong thiết kế UI, vì sao nên sử dụng hệ thống phân cấp typographic (typographic hierarchy)?", opts: ["A. Để người dùng dễ dàng quét (scan) nội dung", "B. Giúp thiết kế trông nghệ thuật hơn", "C. Để tạo ra sự đa dạng trong cách trình bày nội dung", "D. Chỉ để làm đẹp giao diện"], ans: [0] },
  { q: "Cỡ chữ tối thiểu nên dùng cho nội dung văn bản chính trên UI của website hoặc ứng dụng di động là bao nhiêu?", opts: ["A. 10px", "B. 12px", "C. 16px", "D. 20px"], ans: [2] },
  { q: "Khi chọn font chữ cho UI, điều gì cần cân nhắc?", opts: ["A. Font chữ có hỗ trợ các ký tự đặc biệt và đa ngôn ngữ hay không", "B. Font có thể hiển thị tốt trên các màn hình có độ phân giải khác nhau hay không", "C. Font có phù hợp với thương hiệu và phong cách thiết kế hay không", "D. Cả A, B và C"], ans: [3] },
  { q: "Điều nào dưới đây là nguyên tắc đúng khi sử dụng khoảng cách dòng (line height) trong Typography UI?", opts: ["A. Nên đặt khoảng cách dòng bằng đúng kích thước chữ để tiết kiệm không gian", "B. Nên đặt khoảng cách dòng bằng 1.5 lần kích thước chữ để tăng khả năng đọc", "C. Không cần quan tâm đến khoảng cách dòng, miễn là nội dung đầy đủ", "D. Khoảng cách dòng phải bằng 2 lần kích thước chữ để tạo sự thoải mái"], ans: [1] },
  { q: "Điều nào sau đây giúp cải thiện khả năng đọc (readability) của văn bản trong UI?", opts: ["A. Sử dụng màu sắc có độ tương phản tốt giữa chữ và nền", "B. Tránh dùng font chữ quá mỏng trên nền sáng", "C. Không sử dụng tất cả chữ viết hoa (ALL CAPS) cho đoạn văn dài", "D. Cả A, B và C"], ans: [3] },
  { q: "Khi sử dụng Typography trong UI, vì sao cần quan tâm đến chiều dài dòng chữ (line length)?", opts: ["A. Nếu dòng quá dài, người dùng khó đọc và dễ mất tập trung", "B. Nếu dòng quá ngắn, người dùng phải chuyển dòng liên tục gây khó chịu", "C. Cả A và B đều đúng", "D. Chỉ cần tập trung vào kích thước chữ, không cần quan tâm đến chiều dài dòng"], ans: [2] },
  { q: "Font chữ nào sau đây phù hợp nhất cho nội dung chính của một ứng dụng di động?", opts: ["A. Một font chữ trang trí có nhiều nét cong", "B. Một font chữ sans-serif có độ dày vừa phải", "C. Một font chữ viết tay nghệ thuật", "D. Một font chữ có nét quá mỏng và nhỏ"], ans: [1] },
  { q: "Khi thiết kế UI, việc sử dụng quá nhiều kiểu chữ (bold, italic, underline, caps lock, v.v.) có ảnh hưởng gì?", opts: ["A. Làm cho văn bản nổi bật và dễ đọc hơn", "B. Khiến giao diện trông chuyên nghiệp hơn", "C. Làm mất đi sự nhất quán và gây nhiễu thị giác", "D. Giúp nhấn mạnh tất cả nội dung quan trọng"], ans: [2] },
  { q: "Trong thiết kế UI, vì sao cần quan tâm đến tương phản màu sắc (color contrast)?", opts: ["A. Để làm cho thiết kế trông sinh động hơn", "B. Để đảm bảo nội dung dễ đọc và thân thiện với người dùng", "C. Chỉ để tuân theo nguyên tắc thiết kế mà không ảnh hưởng đến trải nghiệm", "D. Không cần quan tâm nếu màu sắc đẹp mắt"], ans: [1] },
  { q: "Công cụ nào sau đây giúp kiểm tra độ tương phản màu sắc theo tiêu chuẩn WCAG?", opts: ["A. Adobe Color", "B. WebAIM Contrast Checker", "C. Google Fonts", "D. Figma Auto Layout"], ans: [1] },
  { q: "Khi thiết kế UI, màu sắc nào thường được sử dụng để thể hiện trạng thái lỗi (error)?", opts: ["A. Xanh lá", "B. Xanh dương", "C. Đỏ", "D. Vàng"], ans: [2] },
  { q: "Trong hệ thống thiết kế UI, màu trung tính (neutral colors) thường được dùng cho mục đích nào?", opts: ["A. Làm nền hoặc viền để hỗ trợ nội dung chính", "B. Làm màu nhấn (accent) để thu hút sự chú ý", "C. Chỉ dùng để làm tiêu đề", "D. Không có vai trò quan trọng"], ans: [0] },
  { q: "Vì sao cần quan tâm đến mù màu (color blindness) trong thiết kế UI?", opts: ["A. Để đảm bảo mọi người đều có thể phân biệt thông tin quan trọng", "B. Chỉ cần quan tâm nếu ứng dụng có người dùng cao tuổi", "C. Màu sắc không ảnh hưởng đến trải nghiệm người dùng mù màu", "D. Không cần quan tâm nếu thiết kế đẹp"], ans: [0] },
  { q: "Quy tắc 60-30-10 trong thiết kế màu sắc có nghĩa là gì?", opts: ["A. 60% màu trung tính, 30% màu bổ trợ, 10% màu nhấn", "B. 60% màu sáng, 30% màu tối, 10% màu trung tính", "C. 60% màu chủ đạo, 30% màu nền, 10% màu ngẫu nhiên", "D. 60% màu nền, 30% màu chữ, 10% màu nhấn"], ans: [0] },
  { q: "Màu nào thường được dùng để thể hiện thông báo thành công (success) trong UI?", opts: ["A. Đỏ", "B. Cam", "C. Xanh lá", "D. Xám"], ans: [2] },
  { q: "Khi chọn màu sắc cho UI, điều nào sau đây là quan trọng nhất?", opts: ["A. Chọn màu theo cảm hứng cá nhân", "B. Đảm bảo màu sắc hỗ trợ tốt khả năng đọc và trải nghiệm người dùng", "C. Sử dụng càng nhiều màu sắc càng tốt để tạo sự đa dạng", "D. Chỉ cần chọn màu theo thương hiệu mà không quan tâm đến trải nghiệm"], ans: [1] },
  { q: "Khi thiết kế giao diện tối (dark mode), điều nào sau đây là đúng?", opts: ["A. Nên sử dụng nền màu đen thuần (#000000) để tiết kiệm pin", "B. Nên dùng nền màu tối vừa phải thay vì đen thuần để giảm mỏi mắt", "C. Không cần quan tâm đến dark mode, chỉ thiết kế chế độ sáng", "D. Dùng màu sáng cho nội dung chính và màu tối cho nội dung phụ"], ans: [1] },
  { q: "Khi thiết kế một UI với nhiều nội dung, nên làm gì để tránh gây nhiễu thị giác?", opts: ["A. Sử dụng ít màu sắc và có sự nhất quán giữa các thành phần", "B. Dùng màu sắc rực rỡ cho tất cả các thành phần để tạo điểm nhấn", "C. Trộn nhiều màu sắc tự do để tạo cảm giác nghệ thuật", "D. Chỉ dùng một màu duy nhất để đơn giản hóa giao diện"], ans: [0] },
  { q: "Quy tắc Grid System trong thiết kế layout giúp ích gì cho UI?", opts: ["A. Tạo sự cân đối và thống nhất giữa các phần tử", "B. Giúp giao diện trông nghệ thuật hơn mà không cần theo quy tắc nào", "C. Chỉ cần dùng khi thiết kế web, không áp dụng cho ứng dụng di động", "D. Dùng để trang trí, không có ảnh hưởng đến UX"], ans: [0] },
  { q: "Trong layout UI, khoảng cách giữa các phần tử (spacing) có vai trò gì?", opts: ["A. Tạo sự rõ ràng, dễ đọc và dễ tương tác", "B. Chỉ để làm đẹp, không ảnh hưởng đến UX", "C. Giúp giảm kích thước thiết kế bằng cách thu hẹp khoảng cách", "D. Không quan trọng, miễn là nội dung đầy đủ"], ans: [0] },
  { q: "Trong thiết kế layout, Flexbox và CSS Grid thường được sử dụng để làm gì?", opts: ["A. Định dạng văn bản trong UI", "B. Sắp xếp và căn chỉnh các phần tử trong giao diện web", "C. Chọn màu sắc phù hợp cho UI", "D. Kiểm tra hiệu suất của ứng dụng"], ans: [1] },
  { q: "Khi thiết kế layout UI, \"F-pattern\" và \"Z-pattern\" liên quan đến điều gì?", opts: ["A. Cách người dùng quét nội dung trên màn hình", "B. Nguyên tắc chọn màu sắc trong UI", "C. Các hiệu ứng động trong giao diện", "D. Chỉ áp dụng cho thiết kế in ấn, không liên quan đến UI"], ans: [0] },
  { q: "Điều gì xảy ra nếu một layout không có sự phân cấp rõ ràng (visual hierarchy)?", opts: ["A. Người dùng dễ bị rối mắt và không biết cần tập trung vào đâu", "B. Tăng trải nghiệm người dùng vì tất cả nội dung đều có tầm quan trọng như nhau", "C. Làm cho UI đẹp hơn vì mọi thứ đều đồng đều", "D. Không có ảnh hưởng gì đến UI"], ans: [0] },
  { q: "Khi thiết kế layout cho ứng dụng di động, yếu tố nào cần đặc biệt lưu ý?", opts: ["A. Độ nhạy cảm ứng và khoảng cách giữa các nút bấm", "B. Sử dụng nhiều hiệu ứng động để thu hút người dùng", "C. Đặt nhiều nội dung trên một màn hình để tối ưu không gian", "D. Không cần quan tâm đến kích thước màn hình, miễn là đẹp"], ans: [0] },
  { q: "Nguyên tắc \"White Space\" (Khoảng trắng) có vai trò gì trong thiết kế layout?", opts: ["A. Là khoảng trống dư thừa, nên loại bỏ để tiết kiệm không gian", "B. Giúp nội dung thoáng đãng, dễ đọc và tăng sự tập trung", "C. Chỉ dùng khi thiết kế tối giản (minimalist)", "D. Không quan trọng vì người dùng chỉ quan tâm đến nội dung chính"], ans: [1] },
  { q: "Điều nào sau đây là một lỗi phổ biến khi thiết kế layout UI?", opts: ["A. Sử dụng một hệ thống lưới (grid) để căn chỉnh nội dung", "B. Không có sự nhất quán trong kích thước và căn chỉnh các phần tử", "C. Giữ khoảng cách hợp lý giữa các thành phần trong giao diện", "D. Sử dụng hierarchy để tạo sự rõ ràng trong nội dung"], ans: [1] },
  { q: "Tại sao cần phải thiết kế layout theo nguyên tắc Mobile-first?", opts: ["A. Vì ngày nay phần lớn người dùng truy cập web bằng thiết bị di động", "B. Giúp thiết kế dễ dàng hơn trên mọi kích thước màn hình", "C. Mobile-first giúp giao diện tối ưu hơn cho tốc độ tải trang", "D. Cả A, B và C đều đúng"], ans: [3] },
  { q: "Khi thiết kế một layout linh hoạt (responsive design), điều quan trọng nhất là gì?", opts: ["A. Nội dung và các thành phần UI có thể điều chỉnh phù hợp trên nhiều kích thước màn hình", "B. Chỉ cần thiết kế giao diện đẹp trên máy tính trước, sau đó mới quan tâm đến di động", "C. Không cần quan tâm đến responsive nếu sản phẩm chỉ chạy trên một nền tảng duy nhất", "D. Sử dụng càng nhiều hiệu ứng động càng tốt để thu hút người dùng"], ans: [0] },
  { q: "Khi sử dụng icon trong thiết kế UI, điều quan trọng nhất là gì?", opts: ["A. Chọn icon đẹp mắt, không quan trọng nội dung", "B. Icon phải dễ hiểu, quen thuộc với người dùng", "C. Sử dụng càng nhiều icon càng tốt để làm giao diện sinh động", "D. Chỉ cần icon có màu sắc nổi bật"], ans: [1] },
  { q: "Tại sao không nên sử dụng quá nhiều icon trang trí trong UI?", opts: ["A. Vì làm giao diện trở nên rối mắt và khó hiểu", "B. Vì icon trang trí không có tác dụng gì trong UI", "C. Vì icon chỉ nên dùng để thay thế văn bản", "D. Vì icon làm chậm tốc độ tải trang"], ans: [0] },
  { q: "Khi chọn icon cho UI, yếu tố nào cần được ưu tiên?", opts: ["A. Phù hợp với ngữ cảnh sử dụng", "B. Dễ nhận diện và nhất quán với thiết kế tổng thể", "C. Có độ phân giải tốt và hiển thị rõ trên mọi kích thước màn hình", "D. Cả A, B và C đều đúng"], ans: [3] },
  { q: "Định dạng icon nào phổ biến nhất để đảm bảo hiển thị sắc nét trên mọi kích thước màn hình?", opts: ["A. PNG", "B. JPG", "C. SVG", "D. GIF"], ans: [2] },
  { q: "Khi sử dụng icon để thay thế văn bản (text), cần lưu ý điều gì?", opts: ["A. Chỉ thay thế khi icon có ý nghĩa rõ ràng và phổ biến", "B. Không cần chú thích vì ai cũng hiểu ý nghĩa của icon", "C. Sử dụng icon thay thế tất cả văn bản để tiết kiệm không gian", "D. Chỉ cần icon đẹp là đủ, không quan trọng chức năng"], ans: [0] },
  { q: "Nguyên tắc nào dưới đây giúp icon dễ nhận diện hơn trong UI?", opts: ["A. Giữ thiết kế đơn giản và nhất quán", "B. Dùng màu sắc và kích thước khác nhau tùy từng icon", "C. Thiết kế icon thật chi tiết để làm nổi bật ý nghĩa", "D. Không quan trọng, chỉ cần icon phù hợp với thương hiệu"], ans: [0] },
  { q: "Điều gì xảy ra nếu các icon trong UI không có sự nhất quán về phong cách?", opts: ["A. Làm giao diện trông thiếu chuyên nghiệp và khó sử dụng", "B. Giúp người dùng dễ dàng nhận biết từng icon hơn", "C. Không có ảnh hưởng gì đến trải nghiệm người dùng", "D. Làm UI trông sinh động và đa dạng hơn"], ans: [0] },
  { q: "Khi thiết kế icon có kích thước nhỏ (dưới 24px), điều gì nên được ưu tiên?", opts: ["A. Giữ thiết kế đơn giản, tránh quá nhiều chi tiết nhỏ", "B. Dùng màu sắc sặc sỡ để làm icon dễ nhận diện", "C. Làm icon có nhiều chi tiết để trông đẹp hơn", "D. Dùng icon động để thu hút sự chú ý"], ans: [0] },
  { q: "Vì sao nên sử dụng font icon (như Font Awesome, Material Icons) thay vì hình ảnh icon dạng PNG?", opts: ["A. Vì font icon có thể tùy chỉnh kích thước và màu sắc linh hoạt", "B. Vì font icon tải nhanh hơn và hiển thị sắc nét trên mọi màn hình", "C. Vì font icon dễ dàng mở rộng mà không bị vỡ hình", "D. Cả A, B và C đều đúng"], ans: [3] },
  { q: "Khi thiết kế UI, điều gì giúp đảm bảo icon có thể sử dụng tốt cho người khiếm thị?", opts: ["A. Sử dụng thuộc tính aria-label hoặc alt text để hỗ trợ trình đọc màn hình", "B. Chọn icon có màu sắc nổi bật hơn", "C. Chỉ sử dụng icon đơn giản, không dùng màu sắc", "D. Tăng kích thước icon để dễ nhìn"], ans: [0] },
  { q: "Trong một giao diện có nhiều cấp độ thông tin, cách tốt nhất để tạo hệ thống phân cấp chữ (typographic hierarchy) là gì?", opts: ["A. Sử dụng kích thước chữ lớn hơn cho nội dung quan trọng nhất", "B. Chỉ thay đổi màu sắc để phân biệt các phần nội dung", "C. Giữ mọi văn bản cùng kích thước để tạo sự đồng nhất", "D. Chỉ dùng chữ in đậm cho toàn bộ tiêu đề và nội dung"], ans: [0] },
  { q: "Khi thiết kế UI, việc sử dụng quá nhiều font chữ khác nhau có thể dẫn đến hậu quả gì?", opts: ["A. Giúp UI trông chuyên nghiệp hơn", "B. Làm giao diện rối mắt và giảm trải nghiệm người dùng", "C. Không ảnh hưởng nhiều nếu màu sắc và kích thước được điều chỉnh hợp lý", "D. Giúp người dùng dễ phân biệt nội dung hơn"], ans: [1] },
  { q: "Điều nào sau đây giúp cải thiện khả năng đọc (readability) của văn bản trên giao diện tối (dark mode)?", opts: ["A. Dùng màu trắng thuần (#FFFFFF) trên nền đen (#000000) để tạo độ tương phản tối đa", "B. Giảm độ sáng của màu chữ (ví dụ: #E0E0E0 thay vì #FFFFFF)", "C. Sử dụng font chữ serif thay vì sans-serif", "D. Làm chữ nhỏ lại để tiết kiệm không gian"], ans: [1] },
  { q: "Khi thiết kế văn bản trong UI, leading (dòng cách dòng - line height) nên được đặt như thế nào?", opts: ["A. Bằng đúng kích thước chữ để tiết kiệm không gian", "B. Lớn hơn một chút so với kích thước chữ để dễ đọc hơn", "C. Luôn gấp đôi kích thước chữ để đảm bảo rõ ràng", "D. Không quan trọng, miễn là nội dung hiển thị đầy đủ"], ans: [1] },
  { q: "Vì sao trong UI, căn lề trái (left-aligned text) thường được sử dụng thay vì căn giữa hoặc căn đều (justified)?", opts: ["A. Giúp mắt di chuyển dễ dàng hơn từ dòng này sang dòng khác", "B. Là tiêu chuẩn của tất cả các thiết kế UI", "C. Căn giữa sẽ làm người dùng mất tập trung hơn", "D. Căn đều làm cho UI trông mất cân đối"], ans: [0] },
  { q: "Khi chọn màu sắc cho trạng thái hover của nút bấm, điều nào là tốt nhất?", opts: ["A. Dùng màu sáng hơn hoặc đậm hơn để báo hiệu sự thay đổi trạng thái", "B. Giữ nguyên màu ban đầu để tránh làm rối người dùng", "C. Chỉ thay đổi hình dạng của nút mà không thay đổi màu sắc", "D. Dùng màu hoàn toàn khác để gây chú ý"], ans: [0] },
  { q: "Điều gì không nên làm khi chọn màu sắc cho văn bản trên nền sáng?", opts: ["A. Sử dụng màu tối để đảm bảo độ tương phản cao", "B. Sử dụng màu xám nhạt để tạo cảm giác nhẹ nhàng", "C. Dùng màu sắc quá rực rỡ khiến mắt nhanh mỏi", "D. Kiểm tra độ tương phản bằng công cụ như WebAIM Contrast Checker"], ans: [2] },
  { q: "Khi thiết kế UI cho người mù màu, phương pháp nào hiệu quả nhất?", opts: ["A. Tránh sử dụng màu sắc làm yếu tố duy nhất để truyền tải thông tin", "B. Chỉ sử dụng màu sắc tiêu chuẩn (red, blue, green)", "C. Dùng màu sắc rực rỡ hơn để giúp họ nhận biết tốt hơn", "D. Tránh dùng quá nhiều màu để giảm rối mắt"], ans: [0] },
  { q: "Analogous color scheme (phối màu tương đồng) có đặc điểm gì?", opts: ["A. Sử dụng các màu nằm gần nhau trên vòng tròn màu", "B. Tạo độ tương phản mạnh giữa các màu", "C. Luôn bao gồm một màu trung tính", "D. Dùng màu đối lập nhau trên vòng tròn màu"], ans: [0] },
  { q: "Trong thiết kế UI, khi nào nên sử dụng màu sắc trung tính (neutral colors)?", opts: ["A. Khi muốn tạo nền giúp nội dung chính nổi bật hơn", "B. Khi cần tạo điểm nhấn mạnh mẽ", "C. Khi muốn thiết kế trông sinh động và sặc sỡ hơn", "D. Khi cần thay thế màu sắc chính trong hệ thống"], ans: [0] },
  { q: "Khi sử dụng 12-column grid system, lợi ích chính là gì?", opts: ["A. Giúp sắp xếp nội dung một cách linh hoạt và nhất quán", "B. Tăng tính sáng tạo bằng cách không cần theo bất kỳ quy luật nào", "C. Chỉ có tác dụng trong thiết kế web, không áp dụng cho ứng dụng di động", "D. Giúp giao diện tải nhanh hơn"], ans: [0] },
  { q: "Vì sao khoảng trắng (white space) quan trọng trong layout UI?", opts: ["A. Giúp nội dung dễ đọc hơn và tạo trải nghiệm tốt hơn", "B. Chỉ để làm đẹp, không ảnh hưởng đến UX", "C. Nên giảm tối đa để tận dụng không gian hiển thị", "D. Không quan trọng nếu màu sắc đủ thu hút"], ans: [0] },
  { q: "Điều nào sau đây không đúng về thiết kế layout trong UI?", opts: ["A. Layout phải có sự thống nhất trên tất cả các màn hình", "B. Tất cả các phần tử nên có khoảng cách hợp lý để tránh cảm giác chật chội", "C. Càng nhiều phần tử trong một màn hình càng tốt để cung cấp đầy đủ thông tin", "D. Cần chú ý đến khả năng mở rộng khi thiết kế layout"], ans: [2] },
  { q: "Khi thiết kế responsive UI, phương pháp mobile-first có lợi ích gì?", opts: ["A. Giúp tối ưu trải nghiệm cho người dùng di động trước tiên", "B. Là tiêu chuẩn bắt buộc trong mọi dự án UI", "C. Không quan trọng nếu ứng dụng chỉ chạy trên desktop", "D. Giúp giảm thời gian thiết kế"], ans: [0] },
  { q: "Trong thiết kế layout, card design (thiết kế dạng thẻ) phù hợp nhất với loại nội dung nào?", opts: ["A. Danh sách tin tức, sản phẩm, hoặc bài viết", "B. Chỉ dùng cho giao diện di động", "C. Không hiệu quả vì tốn nhiều không gian", "D. Chỉ nên dùng trong dashboard"], ans: [0] },
  { q: "Khi thiết kế icon trong UI, nguyên tắc nào quan trọng nhất?", opts: ["A. Icon phải đơn giản, rõ ràng và dễ hiểu", "B. Icon càng chi tiết càng tốt", "C. Không cần icon nếu đã có chữ mô tả", "D. Chỉ nên dùng icon hình tròn vì dễ nhìn hơn"], ans: [0] },
  { q: "Khi thiết kế icon có kích thước nhỏ (dưới 16px), yếu tố nào quan trọng nhất?", opts: ["A. Dùng nhiều màu sắc để tăng độ nhận diện", "B. Phóng to viền icon để dễ nhìn hơn", "C. Dùng hình ảnh bitmap thay vì vector", "D. Giữ thiết kế tối giản, tránh chi tiết phức tạp"], ans: [3] },
  { q: "Khi sử dụng animated icons (icon động) trong UI, cần lưu ý điều gì?", opts: ["A. Sử dụng càng nhiều icon động càng tốt để tạo sự sinh động", "B. Chuyển động phải mượt mà và không gây mất tập trung", "C. Chỉ sử dụng animation trên nền tối", "D. Animation icon không quan trọng trong UI"], ans: [1] },
  { q: "Khi sử dụng icon để biểu thị trạng thái hệ thống (ví dụ: lỗi, thành công, cảnh báo), yếu tố nào quan trọng nhất?", opts: ["A. Chỉ dùng icon mà không cần giải thích bằng chữ", "B. Dùng icon độc quyền để tăng tính thương hiệu", "C. Kết hợp icon với màu sắc và văn bản để tăng tính rõ ràng", "D. Luôn sử dụng icon động để thu hút sự chú ý"], ans: [2] },
  { q: "Phương pháp Heuristic Evaluation giúp đánh giá UI/UX dựa trên tiêu chí nào?", opts: ["A. Danh sách các nguyên tắc thiết kế do chuyên gia xác định", "B. Dữ liệu hành vi thực tế của người dùng", "C. Kiểm thử trực tiếp với người dùng cuối", "D. So sánh với xu hướng thiết kế hiện tại"], ans: [0] },
  { q: "Điều nào không phải là một chỉ số quan trọng khi đánh giá UI/UX?", opts: ["A. Tỷ lệ thoát trang (Bounce Rate)", "B. Tỷ lệ chuyển đổi (Conversion Rate)", "C. Số lượt thích (Likes) trên mạng xã hội", "D. Thời gian hoàn thành tác vụ của người dùng (Task Completion Time)"], ans: [2] },
  { q: "Khi thực hiện kiểm thử khả năng sử dụng (Usability Testing), những điều nào là đúng?", opts: ["A. Quan sát cách người dùng thực hiện các tác vụ trên giao diện", "B. Chỉ nên kiểm thử với nhân viên nội bộ của công ty", "C. Cần có kịch bản kiểm thử rõ ràng với mục tiêu cụ thể", "D. Không cần thu thập phản hồi định tính từ người dùng"], ans: [0, 2] },
  { q: "Eye-tracking (theo dõi chuyển động mắt) thường được sử dụng trong đánh giá UI/UX để làm gì?", opts: ["A. Xác định khu vực giao diện mà người dùng chú ý nhiều nhất", "B. Đo lường tốc độ tải trang", "C. Đánh giá mức độ tương tác của người dùng với chatbot", "D. Xác định số lần nhấp chuột của người dùng vào từng phần tử"], ans: [0] },
  { q: "Trong phương pháp Card Sorting, người dùng sẽ làm gì?", opts: ["A. Sắp xếp các thành phần giao diện theo cách họ thấy hợp lý", "B. Kiểm tra tốc độ tải trang", "C. Thực hiện thao tác kéo-thả để kiểm tra khả năng phản hồi của UI", "D. Điền vào bảng khảo sát đánh giá màu sắc giao diện"], ans: [0] }
].map((item, idx) => ({ ...item, id: idx + 1 }));

const newRawData = [
  { q: "Yếu tố nào không thuộc về UI?", opts: ["A. Màu sắc", "B. Khoảng cách giữa các phần tử", "C. Cảm xúc người dùng khi sử dụng ứng dụng", "D. Kiểu chữ"], ans: [2] },
  { q: "Khi chọn màu nền cho văn bản, yếu tố quan trọng nhất là gì?", opts: ["A. Độ tương phản", "B. Độ sáng của màn hình", "C. Số lượng màu sắc được sử dụng", "D. Độ bão hòa của màu sắc"], ans: [0] },
  { q: "Điều nào giúp cải thiện trải nghiệm người dùng trên ứng dụng web?", opts: ["A. Giảm số lần nhấp chuột để hoàn thành tác vụ", "B. Dùng quá nhiều hiệu ứng động", "C. Hiển thị quảng cáo liên tục", "D. Thiết kế giao diện phức tạp"], ans: [0] },
  { q: "Nguyên tắc \"K.I.S.S\" trong thiết kế UI/UX có nghĩa là gì?", opts: ["A. Keep It Simple and Stupid", "B. Keep It Stylish and Smooth", "C. Keep It Super Simple", "D. Keep It Systematic and Secure"], ans: [0] },
  { q: "Trong hệ thống lưới (grid system), đơn vị phổ biến nhất là gì?", opts: ["A. Pixel", "B. Em", "C. Column", "D. Percentage"], ans: [2] },
  { q: "Khi thiết kế UI, vì sao cần sử dụng khoảng trắng hợp lý?", opts: ["A. Để tạo khoảng nghỉ cho mắt người dùng", "B. Để giảm kích thước trang web", "C. Để tăng độ phức tạp của giao diện", "D. Để làm cho trang web tải nhanh hơn"], ans: [0] },
  { q: "Font chữ nào phù hợp nhất để đọc trên màn hình?", opts: ["A. Comic Sans", "B. Times New Roman", "C. Arial", "D. Vivaldi"], ans: [2] },
  { q: "Điều nào sau đây không phải là một thành phần của UI?", opts: ["A. Layout", "B. Typography", "C. Cảm nhận của người dùng", "D. Màu sắc"], ans: [2] },
  { q: "Yếu tố nào giúp tăng tính truy cập (accessibility) của một trang web?", opts: ["A. Văn bản thay thế cho hình ảnh (alt text)", "B. Dùng nhiều hiệu ứng động", "C. Sử dụng màu sắc tương phản thấp", "D. Giảm kích thước chữ"], ans: [0] },
  { q: "Điều nào giúp nâng cao trải nghiệm người dùng khi nhập dữ liệu?", opts: ["A. Hiển thị gợi ý khi nhập liệu", "B. Bắt buộc nhập tất cả các trường", "C. Không hiển thị thông báo lỗi", "D. Sử dụng CAPTCHA phức tạp"], ans: [0] },
  { q: "Quy tắc 3-click trong UI/UX có nghĩa là gì?", opts: ["A. Người dùng nên hoàn thành tác vụ trong tối đa 3 lần nhấp chuột", "B. Website chỉ được phép có 3 liên kết chính", "C. Một chức năng chỉ có thể sử dụng 3 lần", "D. Menu chính chỉ nên có 3 mục"], ans: [0] },
  { q: "Flat design là gì?", opts: ["A. Phong cách thiết kế tối giản, không có hiệu ứng 3D", "B. Giao diện web chỉ có một màu duy nhất", "C. Thiết kế sử dụng nhiều hiệu ứng bóng đổ", "D. Thiết kế tập trung vào hình ảnh động"], ans: [0] },
  { q: "Tại sao responsive design quan trọng?", opts: ["A. Giúp trang web hoạt động tốt trên nhiều kích thước màn hình", "B. Giảm dung lượng hình ảnh", "C. Tăng tốc độ tải trang", "D. Hạn chế sử dụng JavaScript"], ans: [0] },
  { q: "Nguyên tắc Fitts' Law trong thiết kế UI đề cập đến gì?", opts: ["A. Kích thước và khoảng cách của các đối tượng ảnh hưởng đến tốc độ tương tác của người dùng", "B. Mắt người dùng quét nội dung theo hình chữ \"F\"", "C. Người dùng thích bấm vào các nút lớn hơn", "D. Một trang web cần tối thiểu 3 giây để tải"], ans: [0] },
  { q: "Heatmap trong UX có tác dụng gì?", opts: ["A. Theo dõi vùng người dùng tương tác nhiều nhất trên giao diện", "B. Đo lường thời gian tải trang", "C. Xác định màu sắc phổ biến của trang web", "D. Kiểm tra tốc độ cuộn trang"], ans: [0] },
  { q: "A/B Testing trong UI/UX là gì?", opts: ["A. So sánh hai phiên bản thiết kế để chọn phiên bản tốt hơn", "B. Đánh giá hai trang web cùng lúc", "C. Một phương pháp kiểm tra lỗi trên giao diện", "D. Một kiểu thiết kế đặc biệt"], ans: [0] },
  { q: "Các yếu tố nào giúp tối ưu SEO cho UI/UX?", opts: ["A. Cấu trúc URL rõ ràng", "B. Hiển thị nhiều pop-up", "C. Sử dụng quá nhiều hiệu ứng động", "D. Dùng văn bản màu sáng trên nền sáng"], ans: [0] },
  { q: "Bạn đang thiết kế một trang web thương mại điện tử. Điều nào sau đây giúp cải thiện UX khi người dùng tìm kiếm sản phẩm?", opts: ["A. Hiển thị gợi ý tìm kiếm khi người dùng nhập từ khóa", "B. Chỉ cho phép tìm kiếm theo danh mục sản phẩm", "C. Tự động sửa lỗi chính tả trong từ khóa tìm kiếm", "D. Ẩn thanh tìm kiếm để tránh làm rối giao diện"], ans: [0, 2] },
  { q: "Khi thiết kế form đăng ký tài khoản, điều nào giúp giảm tỷ lệ từ bỏ form?", opts: ["A. Hiển thị tiến trình đăng ký theo từng bước", "B. Bắt buộc nhập lại mật khẩu hai lần mà không có tùy chọn hiển thị mật khẩu", "C. Sử dụng nhãn (label) rõ ràng và đặt placeholder để hướng dẫn nhập liệu", "D. Yêu cầu người dùng nhập tất cả thông tin cá nhân ngay từ bước đầu tiên"], ans: [0, 2] },
  { q: "Bạn đang thiết kế một ứng dụng đặt xe. Điều nào giúp cải thiện trải nghiệm người dùng?", opts: ["A. Hiển thị vị trí tài xế theo thời gian thực trên bản đồ", "B. Chỉ hiển thị vị trí tài xế sau khi xác nhận đặt xe", "C. Cung cấp thông tin chi tiết về tài xế và biển số xe trước khi xe đến đón", "D. Không cần xác nhận giá cước trước khi đặt xe"], ans: [0, 2] },
  { q: "Trong một ứng dụng ngân hàng số, yếu tố nào giúp tăng cường trải nghiệm và bảo mật cho người dùng?", opts: ["A. Cho phép đăng nhập bằng sinh trắc học (vân tay, Face ID)", "B. Tự động đăng xuất sau một khoảng thời gian không hoạt động", "C. Bắt buộc nhập lại mật khẩu mỗi lần giao dịch, dù là số tiền nhỏ", "D. Không hiển thị thông báo lỗi cụ thể khi nhập sai mật khẩu"], ans: [0, 1] },
  { q: "Khi thiết kế giao diện mobile app, điều nào giúp tăng tỷ lệ chuyển đổi (conversion rate)?", opts: ["A. Nút CTA (Call to Action) lớn, dễ nhìn và nằm trong vùng có thể chạm bằng ngón tay", "B. Yêu cầu người dùng tạo tài khoản trước khi hiển thị bất kỳ nội dung nào", "C. Giảm số lượng bước khi thực hiện thanh toán", "D. Hiển thị quảng cáo toàn màn hình ngay khi người dùng mở ứng dụng"], ans: [0, 2] },
  { q: "Một website bán hàng muốn tăng trải nghiệm người dùng khi xem sản phẩm. Điều nào là cách tiếp cận đúng?", opts: ["A. Cung cấp ảnh sản phẩm độ phân giải cao, có thể phóng to chi tiết", "B. Hiển thị quá nhiều thông tin kỹ thuật trên trang sản phẩm", "C. Cung cấp đánh giá từ khách hàng khác ngay trên trang sản phẩm", "D. Tự động phát video quảng cáo sản phẩm mà không có nút tắt"], ans: [0, 2] },
  { q: "Khi thiết kế menu điều hướng trên website, điều nào giúp cải thiện trải nghiệm người dùng?", opts: ["A. Sử dụng menu cố định (sticky menu) trên trang web dài", "B. Ẩn menu và chỉ hiển thị khi người dùng di chuột vào góc màn hình", "C. Đặt tất cả các danh mục trong một menu duy nhất, không phân nhóm", "D. Sử dụng tối đa 7 mục chính trong menu để tránh gây quá tải thông tin"], ans: [0] },
  { q: "Một ứng dụng giao hàng cần cải thiện UX. Điều nào sau đây là giải pháp hợp lý?", opts: ["A. Hiển thị dự kiến thời gian giao hàng dựa trên vị trí thực tế", "B. Chỉ thông báo trạng thái đơn hàng khi người dùng tự kiểm tra", "C. Cung cấp tùy chọn thay đổi địa chỉ giao hàng ngay trước khi giao", "D. Chỉ gửi thông báo qua email, không có thông báo trong ứng dụng"], ans: [0, 2] },
  { q: "Bạn đang thiết kế trang web tin tức. Điều nào giúp giữ chân người đọc lâu hơn?", opts: ["A. Hiển thị nội dung liên quan sau mỗi bài viết", "B. Không cho phép đọc bài viết nếu chưa đăng nhập", "C. Tự động tải bài viết tiếp theo khi cuộn đến cuối trang", "D. Sử dụng quá nhiều quảng cáo giữa nội dung bài viết"], ans: [0, 2] },
  { q: "Một website cần cải thiện tốc độ tải trang để nâng cao trải nghiệm. Điều nào là cách tiếp cận đúng?", opts: ["A. Tối ưu hình ảnh bằng cách sử dụng định dạng WebP", "B. Giảm số lượng yêu cầu HTTP bằng cách gộp file CSS và JavaScript", "C. Tăng kích thước ảnh để đảm bảo chất lượng hiển thị tốt hơn", "D. Tắt cache trình duyệt để luôn tải dữ liệu mới"], ans: [0, 1] },
  { q: "Phương pháp nào thường được sử dụng để đánh giá khả năng sử dụng (usability) của giao diện?", opts: ["A. Kiểm thử người dùng (User Testing)", "B. Phân tích heuristic (Heuristic Evaluation)", "C. A/B Testing", "D. So sánh với các trang web đối thủ mà không cần thử nghiệm"], ans: [0, 1] },
  { q: "Khi thực hiện A/B Testing trên UI, điều nào là đúng?", opts: ["A. Chỉ nên thay đổi một yếu tố tại một thời điểm", "B. Có thể thử nghiệm nhiều yếu tố cùng lúc mà không ảnh hưởng đến kết quả", "C. A/B Testing chỉ áp dụng cho giao diện web, không áp dụng cho mobile app", "D. Cần có một lượng dữ liệu đủ lớn để đảm bảo kết quả có ý nghĩa thống kê"], ans: [0, 3] },
  { q: "Khi thực hiện phỏng vấn người dùng để đánh giá UX, điều nào là quan trọng nhất?", opts: ["A. Đặt câu hỏi mở để người dùng chia sẻ trải nghiệm thực tế", "B. Hướng dẫn người dùng trả lời theo cách mình mong muốn", "C. Ghi nhận cả phản hồi tích cực và tiêu cực", "D. Chỉ tập trung vào các phản hồi tiêu cực để cải thiện sản phẩm"], ans: [0, 2] },
  { q: "Design System là gì?", opts: ["A. Một bộ tài liệu hướng dẫn về UI/UX giúp tạo sự nhất quán trong thiết kế", "B. Một tập hợp các mẫu giao diện UI đã được lập trình sẵn", "C. Một hệ thống giúp các nhà thiết kế và lập trình viên làm việc hiệu quả hơn", "D. Một bộ quy tắc chỉ áp dụng cho thiết kế ứng dụng di động"], ans: [0, 2] },
  { q: "Thành phần chính của một Design System là gì?", opts: ["A. Thư viện UI Components", "B. Hướng dẫn về màu sắc, typography, khoảng cách", "C. Tài liệu hướng dẫn cách phát triển hệ thống backend", "D. Nguyên tắc thiết kế và quy trình làm việc"], ans: [0, 1, 3] },
  { q: "Lợi ích chính của Design System trong thiết kế UI/UX là gì?", opts: ["A. Tăng tốc độ thiết kế và phát triển sản phẩm", "B. Giúp giao diện có tính nhất quán trên nhiều nền tảng", "C. Giảm số lượng lỗi thiết kế không đồng nhất", "D. Hạn chế sự sáng tạo của nhà thiết kế"], ans: [0, 1, 2] },
  { q: "Atomic Design là gì?", opts: ["A. Một phương pháp tổ chức UI Components theo các cấp độ từ nhỏ đến lớn", "B. Một loại framework frontend", "C. Chỉ áp dụng cho thiết kế web tĩnh", "D. Bao gồm các thành phần: Atoms, Molecules, Organisms, Templates, Pages"], ans: [0, 3] },
  { q: "Trong Design System, thành phần nào giúp đảm bảo tính nhất quán về nội dung?", opts: ["A. Content Guidelines", "B. Design Tokens", "C. UI Components", "D. Brand Identity"], ans: [0] },
  { q: "Design Tokens được sử dụng để làm gì trong Design System?", opts: ["A. Lưu trữ các giá trị thiết kế như màu sắc, khoảng cách, typography", "B. Tạo các mẫu giao diện động", "C. Là một công cụ lập trình backend", "D. Giúp tùy chỉnh giao diện linh hoạt hơn trên các nền tảng khác nhau"], ans: [0, 3] },
  { q: "Khi nào nên xây dựng hoặc áp dụng Design System?", opts: ["A. Khi muốn tạo giao diện nhất quán trên nhiều sản phẩm", "B. Khi đội ngũ thiết kế và phát triển phải làm việc cùng nhau", "C. Chỉ khi sản phẩm đã hoàn thiện", "D. Khi cần tăng tốc độ phát triển UI"], ans: [0, 1, 3] },
  { q: "Trong một Design System, nguyên tắc nào giúp tạo trải nghiệm người dùng tốt hơn?", opts: ["A. Tính nhất quán trong thiết kế và trải nghiệm", "B. Linh hoạt để dễ dàng tùy chỉnh khi cần thiết", "C. Không cần tuân thủ bất kỳ quy tắc nào để tăng tính sáng tạo", "D. Đảm bảo khả năng truy cập (Accessibility) cho mọi người dùng"], ans: [0, 1, 3] },
  { q: "Một số Design System phổ biến hiện nay là gì?", opts: ["A. Google Material Design", "B. Apple Human Interface Guidelines", "C. Bootstrap Grid System", "D. Atlassian Design System"], ans: [0, 1, 3] },
  { q: "Điều nào sau đây không phải là một nhược điểm của Design System?", opts: ["A. Cần đầu tư thời gian và nguồn lực ban đầu để xây dựng", "B. Có thể giới hạn sự sáng tạo của nhà thiết kế", "C. Tăng khả năng mở rộng và bảo trì giao diện sản phẩm", "D. Khó khăn trong việc áp dụng đồng bộ khi có quá nhiều thành viên trong nhóm"], ans: [2] }
].map((item, idx) => ({ ...item, id: idx + 1 }));

const quizSetsSeed = [
  { id: 'old', description: 'Bộ câu hỏi gốc', data: oldRawData },
  { id: 'new', description: 'Bộ câu hỏi mới', data: newRawData }
];

const quizSets = quizSetsSeed.map((set, index) => ({
  ...set,
  title: `C${index + 1}-VA`
}));

const isCorrect = (userAns, correctAns) => {
  if (!userAns || userAns.length === 0) return false;
  if (userAns.length !== correctAns.length) return false;
  const sortedUser = [...userAns].sort();
  const sortedCorrect = [...correctAns].sort();
  return sortedUser.every((val, index) => val === sortedCorrect[index]);
};

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Xác nhận", cancelText = "Hủy" }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 animate-in fade-in zoom-in-95 duration-200">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button onClick={onCancel} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">
            {cancelText}
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

const QuizScreen = ({ quiz, onBack }) => {
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '', message: '', type: '' });
  const data = quiz.data;

  const handleOptionChange = (questionId, optionIndex, isMultiple) => {
    if (isSubmitted) return;
    setAnswers(prev => {
      if (!isMultiple) return { ...prev, [questionId]: [optionIndex] };
      const current = prev[questionId] || [];
      if (current.includes(optionIndex)) return { ...prev, [questionId]: current.filter(i => i !== optionIndex) };
      return { ...prev, [questionId]: [...current, optionIndex] };
    });
  };

  const scrollToQuestion = (id) => {
    const el = document.getElementById(`question-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setIsMenuOpen(false);
  };

  const handleRequestSubmit = () => {
    const answeredCount = Object.keys(answers).length;
    if (answeredCount < data.length) {
      setModalConfig({
        isOpen: true,
        title: 'Chưa hoàn thành',
        message: `Bạn mới làm được ${answeredCount}/${data.length} câu. Bạn có chắc chắn muốn nộp bài không?`,
        type: 'submit',
        confirmText: 'Nộp bài',
        cancelText: 'Tiếp tục làm'
      });
      return;
    }
    setModalConfig({
      isOpen: true,
      title: 'Xác nhận nộp bài',
      message: 'Bạn có chắc chắn muốn nộp bài thi này?',
      type: 'submit',
      confirmText: 'Nộp bài',
      cancelText: 'Hủy'
    });
  };

  const handleRequestRetry = () => {
    setModalConfig({
      isOpen: true,
      title: 'Làm lại từ đầu',
      message: 'Bạn có muốn làm lại từ đầu? Mọi kết quả hiện tại sẽ bị xóa sạch.',
      type: 'retry',
      confirmText: 'Làm lại',
      cancelText: 'Hủy'
    });
  };

  const handleConfirmModal = () => {
    if (modalConfig.type === 'submit') {
      setIsSubmitted(true);
      let currentScore = 0;
      data.forEach(q => { if (isCorrect(answers[q.id], q.ans)) currentScore++; });
      setScore(currentScore);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (modalConfig.type === 'retry') {
      setAnswers({});
      setIsSubmitted(false);
      setScore(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setModalConfig({ ...modalConfig, isOpen: false });
  };

  const answeredCount = Object.keys(answers).length;
  const progressPercent = (answeredCount / data.length) * 100;

  const QuestionGrid = () => (
    <div className="grid grid-cols-5 gap-2 max-h-[45vh] md:max-h-[55vh] overflow-y-auto mb-4 p-1 custom-scrollbar">
      {data.map(q => {
        const isAnswered = answers[q.id] && answers[q.id].length > 0;
        const isRight = isCorrect(answers[q.id], q.ans);
        let btnClass = "bg-white text-gray-700 border-gray-300 hover:bg-gray-50";
        if (!isSubmitted && isAnswered) btnClass = "bg-blue-600 text-white border-blue-600";
        if (isSubmitted && isRight) btnClass = "bg-green-500 text-white border-green-500";
        if (isSubmitted && isAnswered && !isRight) btnClass = "bg-red-500 text-white border-red-500";
        if (isSubmitted && !isAnswered) btnClass = "bg-gray-100 text-gray-400 border-gray-200";
        return (
          <button key={q.id} onClick={() => scrollToQuestion(q.id)} className={`w-9 h-9 sm:w-10 sm:h-10 rounded border text-sm font-medium flex items-center justify-center transition-colors ${btnClass}`}>
            {q.id}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800 pb-20 md:pb-8">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #a8a8a8; }
      `}</style>

      <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-2">
          <button onClick={onBack} className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center space-x-2">
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Quay lại</span>
          </button>
          <h1 className="font-bold text-lg sm:text-xl text-blue-700 truncate">{quiz.title}</h1>
          {isSubmitted ? (
            <div className="font-bold text-sm sm:text-lg text-green-600 px-3 py-1 bg-green-50 rounded-lg whitespace-nowrap">
              Điểm: <span className="text-lg sm:text-2xl">{score}</span>/{data.length}
            </div>
          ) : (
            <div className="w-[86px] sm:w-[130px]" />
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 relative">
        <div className="md:col-span-8 lg:col-span-9">
          {isSubmitted && (
            <div className="bg-white rounded-xl shadow-sm border border-green-200 p-6 mb-8 text-center animate-in fade-in slide-in-from-top-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} strokeWidth={3} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Kết quả bài làm</h2>
              <div className="text-4xl font-bold text-blue-600 mb-2">{score} <span className="text-xl text-gray-500">/ {data.length}</span></div>
              <p className="text-gray-600">Bạn đã trả lời đúng {score} trên tổng số {data.length} câu hỏi.</p>
            </div>
          )}

          {data.map((q) => {
            const userAns = answers[q.id] || [];
            const isAnsMultiple = q.ans.length > 1;
            const isRight = isCorrect(userAns, q.ans);
            return (
              <div id={`question-${q.id}`} key={q.id} className={`bg-white rounded-xl shadow-sm border p-4 sm:p-6 mb-6 scroll-mt-24 transition-colors ${isSubmitted ? (isRight ? 'border-green-300 bg-green-50/20' : 'border-red-300 bg-red-50/20') : 'border-gray-200'}`}>
                <div className="flex space-x-3 sm:space-x-4 mb-4">
                  <div className={`font-bold flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base ${isSubmitted ? (isRight ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700') : 'bg-blue-100 text-blue-700'}`}>
                    {q.id}
                  </div>
                  <h2 className="text-gray-800 font-semibold text-base sm:text-lg pt-1 leading-snug">
                    {q.q}
                    {isAnsMultiple && <span className="ml-2 text-sm font-normal text-amber-600 italic inline-block mt-1 sm:mt-0">(Chọn nhiều đáp án)</span>}
                  </h2>
                </div>
                <div className="space-y-3 pl-11 sm:pl-14">
                  {q.opts.map((opt, idx) => {
                    const isSelected = userAns.includes(idx);
                    const isCorrectAns = q.ans.includes(idx);
                    let statusClass = "border-gray-200 hover:bg-gray-50";
                    let iconClass = "border-gray-400 bg-white";
                    let textColor = "text-gray-800";
                    if (!isSubmitted) {
                      if (isSelected) {
                        statusClass = "bg-blue-50 border-blue-400";
                        iconClass = "border-blue-500 bg-blue-500 text-white";
                        textColor = "text-blue-900 font-medium";
                      }
                    } else if (isCorrectAns) {
                      statusClass = "bg-green-50 border-green-500";
                      iconClass = "border-green-500 bg-green-500 text-white";
                      textColor = "text-green-900 font-medium";
                    } else if (isSelected && !isCorrectAns) {
                      statusClass = "bg-red-50 border-red-400";
                      iconClass = "border-red-500 bg-red-500 text-white";
                      textColor = "text-red-900 line-through opacity-70";
                    } else {
                      statusClass = "border-gray-200 opacity-50";
                      iconClass = "border-gray-300 bg-gray-100";
                    }

                    return (
                      <div key={idx} onClick={() => handleOptionChange(q.id, idx, isAnsMultiple)} className={`p-3 border rounded-lg transition-all flex items-start space-x-3 select-none ${statusClass} ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}`}>
                        <div className={`mt-0.5 w-5 h-5 flex-shrink-0 flex items-center justify-center border ${isAnsMultiple ? 'rounded' : 'rounded-full'} ${iconClass}`}>
                          {!isSubmitted && isSelected && !isAnsMultiple && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                          {!isSubmitted && isSelected && isAnsMultiple && <Check size={14} strokeWidth={3} />}
                          {isSubmitted && isCorrectAns && <Check size={14} strokeWidth={3} />}
                          {isSubmitted && isSelected && !isCorrectAns && <XIcon size={14} strokeWidth={3} />}
                        </div>
                        <div className={`${textColor} text-sm sm:text-base leading-snug`}>{opt}</div>
                      </div>
                    );
                  })}
                </div>

                {isSubmitted && !isRight && (
                  <div className="mt-5 pl-11 sm:pl-14 animate-in fade-in">
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-start space-x-2 text-amber-900 text-sm sm:text-base">
                      <AlertCircle size={20} className="mt-0.5 flex-shrink-0 text-amber-600" />
                      <div>
                        <span className="font-semibold block mb-1">Đáp án đúng là:</span>
                        <ul className="list-disc pl-4 space-y-1">
                          {q.ans.map(ansIdx => <li key={ansIdx}>{q.opts[ansIdx]}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="hidden md:block md:col-span-4 lg:col-span-3">
          <div className="sticky top-24 bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="text-center mb-5 pb-5 border-b border-gray-100">
              <div className="text-sm text-gray-500 mb-1 flex items-center justify-center space-x-1">
                <Clock size={16} />
                <span>Thời gian làm bài</span>
              </div>
              <div className="text-xl font-bold text-gray-800">Không giới hạn</div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2 font-semibold text-gray-700">
                <span>Tiến độ làm bài:</span>
                <span className={answeredCount === data.length ? 'text-green-600' : ''}>{answeredCount}/{data.length}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>
            <QuestionGrid />
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
              {!isSubmitted ? (
                <button onClick={handleRequestSubmit} className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-sm hover:shadow">NỘP BÀI</button>
              ) : (
                <button onClick={handleRequestRetry} className="w-full py-3.5 bg-gray-800 text-white rounded-lg font-bold hover:bg-gray-900 transition shadow-sm flex items-center justify-center space-x-2">
                  <RefreshCw size={18} />
                  <span>LÀM LẠI</span>
                </button>
              )}
              <button onClick={onBack} className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50">
                Quay lại chọn bộ câu hỏi
              </button>
            </div>
          </div>
        </div>
      </main>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex justify-between items-center shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] z-40">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Đã làm</span>
          <span className="font-bold text-blue-700 text-lg leading-none">{answeredCount}/{data.length}</span>
        </div>
        <div className="flex space-x-2">
          <button onClick={onBack} className="px-3 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-bold">Quay lại</button>
          <button onClick={() => setIsMenuOpen(true)} className="p-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"><Menu size={20} /></button>
          {!isSubmitted ? (
            <button onClick={handleRequestSubmit} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-bold shadow-sm">Nộp bài</button>
          ) : (
            <button onClick={handleRequestRetry} className="px-5 py-2.5 bg-gray-800 text-white rounded-lg font-bold shadow-sm flex items-center space-x-2">
              <RefreshCw size={16} />
              <span>Làm lại</span>
            </button>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex flex-col justify-end">
          <div className="bg-white p-5 rounded-t-2xl max-h-[80vh] flex flex-col animate-in slide-in-from-bottom-8 duration-200">
            <div className="flex justify-between items-center mb-5 pb-3 border-b">
              <h3 className="font-bold text-lg">Danh sách câu hỏi</h3>
              <button onClick={() => setIsMenuOpen(false)} className="p-1 text-gray-500 hover:bg-gray-100 rounded-full"><XIcon size={24} /></button>
            </div>
            <QuestionGrid />
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        cancelText={modalConfig.cancelText}
        onConfirm={handleConfirmModal}
        onCancel={() => setModalConfig({ ...modalConfig, isOpen: false })}
      />
    </div>
  );
};

export default function App() {
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const selectedQuiz = quizSets.find(set => set.id === selectedQuizId) || null;

  useEffect(() => {
    document.title = selectedQuiz ? selectedQuiz.title : "Đề kiểm tra UI/UX Design";
  }, [selectedQuiz]);

  if (selectedQuiz) {
    return <QuizScreen quiz={selectedQuiz} onBack={() => setSelectedQuizId(null)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-3">Đề kiểm tra UI/UX Design</h1>
          <p className="text-gray-600">Vui lòng chọn bộ câu hỏi trước khi bắt đầu làm bài.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quizSets.map(quiz => (
            <button key={quiz.id} onClick={() => setSelectedQuizId(quiz.id)} className="bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md rounded-xl p-6 text-left transition-all">
              <h2 className="text-xl font-bold text-gray-900 mb-1">{quiz.title}</h2>
              <div className="text-sm text-gray-500 mb-2">{quiz.description}</div>
              <div className="text-blue-700 font-semibold">{quiz.data.length} câu hỏi</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
