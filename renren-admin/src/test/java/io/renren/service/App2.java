package io.renren.service;

/**
 * @Author:wanglei1
 * @Date: 2019/8/23 18:08
 */

import io.renren.App;
import org.apache.commons.io.FileUtils;

import java.io.*;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import jxl.read.biff.BiffException;
import org.apache.commons.io.FileUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

/**
 * @Author:wanglei1
 * @Date: 2019/8/20 20:01
 */
public class App2 {
    static Pattern pattern = Pattern.compile("(-?\\d+\\.?\\d*)[Ee]{1}[\\+-]?[0-9]*");
    static DecimalFormat ds = new DecimalFormat("0");
    static boolean isENum(String input) {//判断输入字符串是否为科学计数法
        return pattern.matcher(input).matches();
    }
    public static void main(String[] args) {
        App obj = new App();
        // 此处为我创建Excel路径：E:/zhanhj/studysrc/jxl下
        File file = new File("E:\\a.xlsx");
        readExcel("E:\\a.xlsx");
        // List excelList = obj.readExcel(file);
       /* for (int i = 0; i < excelList.size(); i++) {
            List list = (List) excelList.get(i);
            for (int j = 0; j < list.size(); j++) {
                System.out.print(list.get(j));
            }
            System.out.println();
        }*/

    }
    // 去读Excel的方法readExcel，该方法的入口参数为一个File对象
    public static List readExcel(String filePath) {
        List<String> list1 = new ArrayList<>();
        List<String> list2 = new ArrayList<>();
        try {
            // 创建输入流，读取Excel
            // InputStream is = new FileInputStream(file.getAbsolutePath());
            // jxl提供的Workbook类
            Workbook wb = null;
            try {
                wb = readExcel2(filePath); //文件
            } catch (Exception e) {
                e.printStackTrace();
            }
            /*Sheet sheet = wb.getSheetAt(0); //sheet*/
            // Excel的页签数量
            int sheet_size = wb.getNumberOfSheets();
            System.out.println(sheet_size);
            int secondId = 100;

            for (int index = 3; index < sheet_size; index++) {
                List<List> outerList=new ArrayList<List>();
                // 每个页签创建一个Sheet对象
                Sheet sheet = wb.getSheetAt(index);
                String s = sheet.getSheetName();
                s = s.replaceAll("特征化", "");
                secondId++;
                String sql = "INSERT into dict(type_id, second_id, second_name) VALUES (11, " + secondId + ", " + "'"+s + "'" + ");";
                list1.add(sql);
                // sheet.getRows()返回该页的总行数
                System.out.println(sheet.getLastRowNum());
                for (int i = 1; i < 15; i++) {
                    String sss = "INSERT into calculate_feature(feature_11_second_id, name , unit, factor, excel_order) VALUES (" + secondId + ", '";
                    List innerList=new ArrayList();
                    // sheet.getColumns()返回该页的总列数
                    for (int j = 1; j < 4; j++) {
                        Row row = sheet.getRow(i);
                        Object cellinfo = getCellFormatValue(row.getCell(j));
                        if(cellinfo == null){
                            continue;
                        }
                        //String cellinfo = sheet.getCell(j, i).getContents();
                        // System.out.println(cellinfo);
                        sss += cellinfo;

                        sss += "','";

                        innerList.add(cellinfo);
                        //System.out.println(String.valueOf(cellinfo.getBytes()));
                    }
                    sss = sss.substring(0, sss.length() -2);
                    String string = ", "+i;
                    sss+= string;
                    sss += ");";
                    System.out.println(sss);
                    list2.add(sss);
                }

                //return outerList;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        try {
            FileUtils.writeLines(new File("11.txt"), list1, true);
            FileUtils.writeLines(new File("12.txt"), list2, true);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }
    //读取excel
    public static Workbook readExcel2(String filePath){
        Workbook wb = null;
        if(filePath==null){
            return null;
        }
        String extString = filePath.substring(filePath.lastIndexOf("."));
        InputStream is = null;
        try {
            is = new FileInputStream(filePath);
            if(".xls".equals(extString)){
                return wb = new HSSFWorkbook(is);
            }else if(".xlsx".equals(extString)){
                return wb = new XSSFWorkbook(is);
            }else{
                return wb = null;
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return wb;
    }
    public static boolean isEmpty(String s){
        if (s == null || s == ""){
            return true;
        }
        return false;
    }
    public static Object getCellFormatValue(Cell cell){
        Object cellValue = null;
        if(cell!=null){
            //判断cell类型
            switch(cell.getCellType()){
                case NUMERIC:{
                    cell.setCellType(CellType.STRING);  //将数值型cell设置为string型
                    cellValue = cell.getStringCellValue();
                    break;
                }
                case FORMULA:{
                    //判断cell是否为日期格式
                    if(DateUtil.isCellDateFormatted(cell)){
                        //转换为日期格式YYYY-mm-dd
                        cellValue = cell.getDateCellValue();
                    }else{
                        //数字
                        cellValue = String.valueOf(cell.getNumericCellValue());
                    }
                    break;
                }
                case STRING:{
                    cellValue = cell.getRichStringCellValue().getString();
                    break;
                }
                default:
                    cellValue = "";
            }
        }else{
            cellValue = "";
        }
        return cellValue;
    }


}
